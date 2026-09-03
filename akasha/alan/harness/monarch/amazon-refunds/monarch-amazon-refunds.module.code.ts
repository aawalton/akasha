#!/usr/bin/env bun

import { amazonMovements } from "../amazon-lines/monarch-amazon-lines.module.code.ts"
import type { Movement } from "../amazon-match/monarch-amazon-match.module.code.ts"
import {
  noteForRefund,
  partition,
  refundAccountsFor,
  soleProduct,
} from "../amazon-match/monarch-amazon-match.module.code.ts"
import { orderEmails } from "../amazon-notes/monarch-amazon-notes.module.code.ts"
import type { AmazonOrder } from "../amazon-order/monarch-amazon-order.module.code.ts"
import { parseOrderEmail } from "../amazon-order/monarch-amazon-order.module.code.ts"
import type { AmazonRefund } from "../amazon-refund/monarch-amazon-refund.module.code.ts"
import { parseRefundEmail } from "../amazon-refund/monarch-amazon-refund.module.code.ts"
import {
  AMAZON_SINCE,
  applyNote,
  isAmazon,
} from "../amazon-write/monarch-amazon-write.module.code.ts"
import { monarchClient } from "../client/monarch-client.module.code.ts"
import { monarchHeaders } from "../credential/monarch-credential.module.code.ts"
import type { EmailMessage } from "../gmail-cache/monarch-gmail-cache.module.code.ts"
import { cachedMessages } from "../gmail-cache/monarch-gmail-cache.module.code.ts"
import {
  revertFromSnapshot,
  takeSnapshot,
} from "../notes-revert/monarch-notes-revert.module.code.ts"
import { liveTransaction, mayWriteNotes } from "../notes-write/monarch-notes-write.module.code.ts"

const GMAIL_QUERY = 'from:return@amazon.com subject:"refund issued"'

const HOME = process.env.HOME ?? "/home/walton"
const BODY_CACHE = `${HOME}/.cache/monarch-amazon-refunds`

export async function refundEmails(): Promise<readonly EmailMessage[]> {
  return cachedMessages({ query: GMAIL_QUERY, cacheDir: BODY_CACHE, label: "refund notices" })
}

export async function candidateCredits(): Promise<readonly Movement[]> {
  return amazonMovements((amount) => amount > 0)
}

const money = (cents: number): string => `$${(cents / 100).toFixed(2)}`

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const writing = argv.includes("--write")
  const reverting = argv.includes("--revert")
  const onlyAt = argv.indexOf("--only")
  const only = onlyAt === -1 ? null : argv[onlyAt + 1]
  if (only === undefined) throw new Error("--only names no transaction, so nothing is singled out")
  const auth = await monarchHeaders()

  const { transactions } = monarchClient(auth)

  if (reverting) {
    await revertFromSnapshot(auth, transactions, { only, writing })
    return
  }

  const refunds: AmazonRefund[] = []
  let unreadable = 0
  for (const email of await refundEmails()) {
    const refund = parseRefundEmail(email)
    if (refund === null) unreadable += 1
    else refunds.push(refund)
  }
  console.log(
    `parsed ${refunds.length} refund(s) to amount, order number and ASIN; ` +
      `${unreadable} message(s) carried fewer than all three`
  )

  const orders: AmazonOrder[] = []
  for (const email of await orderEmails()) {
    const order = parseOrderEmail(email)
    if (order !== null) orders.push(order)
  }
  console.log(`parsed ${orders.length} order confirmation(s) for product names`)

  const credits = await candidateCredits()
  console.log(
    `our copy: ${credits.length} Amazon credit(s) since ${AMAZON_SINCE} whose notes read empty`
  )
  const { unique, ambiguous, unmatched } = partition(credits, refunds, refundAccountsFor)
  console.log(`\nmatched ${unique.length} credit(s) to exactly one refund email`)
  console.log(
    `abstained on ${ambiguous.length} credit(s) matching two or more — none of these is written`
  )
  console.log(`${unmatched.length} credit(s) matched no refund email`)

  for (const a of ambiguous) {
    console.log(
      `  abstain ${a.movement.monarchId} ${a.movement.date} ${money(a.movement.amountCents)}:`
    )
    for (const r of a.candidates) {
      const product = soleProduct(orders, r.orderNumber)
      console.log(`      order ${r.orderNumber} asin ${r.asin} — ${product ?? r.statedTitle}`)
    }
  }
  for (const u of unmatched) {
    console.log(`  unmatched ${u.monarchId} ${u.date} ${money(u.amountCents)}`)
  }

  const named: { movement: Movement; refund: AmazonRefund; product: string }[] = []
  const unnamed: { movement: Movement; refund: AmazonRefund }[] = []
  for (const { movement, candidate: refund } of unique) {
    const product = soleProduct(orders, refund.orderNumber)
    if (product === null) unnamed.push({ movement, refund })
    else named.push({ movement, refund, product })
  }
  if (unnamed.length > 0) {
    console.log(
      `\n${unnamed.length} matched credit(s) whose order does not settle which item came back:`
    )
    for (const u of unnamed) {
      console.log(
        `  ${u.movement.monarchId} ${u.movement.date} order ${u.refund.orderNumber} asin ${u.refund.asin}`
      )
    }
  }

  const today = new Date().toISOString().slice(0, 10)
  const all = (await transactions({ startDate: AMAZON_SINCE, endDate: today })).filter(isAmazon)
  console.log("")
  takeSnapshot(all)

  let targets = named
  if (only !== null) {
    const found = named.find((m) => m.movement.monarchId === only)
    if (found === undefined) {
      const standing = all.find((t) => t.id === only)
      if (standing === undefined)
        throw new Error(`no Amazon transaction ${only} since ${AMAZON_SINCE}`)
      const live = await liveTransaction(transactions, only, standing.date)
      console.log(
        `\n--only ${only}: live notes ${JSON.stringify(live.notes)}, ` +
          `${mayWriteNotes(live.notes) ? "writable" : "REFUSED — a note already stands there"}`
      )
      return
    }
    targets = [found]
  }

  let written = 0
  let declined = 0
  let repaired = 0
  for (const { movement, refund, product } of targets) {
    const applied = await applyNote(
      { auth, fetchDay: transactions, writing },
      movement,
      refund.orderNumber,
      noteForRefund(refund, product)
    )
    if (applied.kind === "would-write") {
      written += 1
      console.log(`  would write ${movement.monarchId}: ${applied.note}`)
    } else if (applied.kind === "would-decline" || applied.kind === "declined") {
      declined += 1
      if (applied.kind === "declined" && applied.repaired) repaired += 1
      console.log(
        `  declined ${movement.monarchId}: ${JSON.stringify(applied.standing)} already stands there`
      )
    } else {
      written += 1
      if (applied.respelled)
        console.log(`  note stored in Monarch's own spelling on ${movement.monarchId}`)
      console.log(
        `  wrote ${movement.monarchId} [${applied.tagCount} tag(s)] ${refund.orderNumber}: ${applied.note}`
      )
    }
  }
  console.log(
    `\n${writing ? "wrote" : "would write"} ${written} transaction(s); declined ${declined} ` +
      `carrying a live note; recorded ${repaired} owed order number(s)`
  )
}

if (import.meta.main) {
  await main()
}
