#!/usr/bin/env bun

import { amazonMovements } from "../amazon-lines/monarch-amazon-lines.module.code.ts"
import type { Movement } from "../amazon-match/monarch-amazon-match.module.code.ts"
import {
  accountsFor,
  noteFor,
  partition,
} from "../amazon-match/monarch-amazon-match.module.code.ts"
import type { AmazonOrder } from "../amazon-order/monarch-amazon-order.module.code.ts"
import { parseOrderEmail } from "../amazon-order/monarch-amazon-order.module.code.ts"
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

const GMAIL_QUERY = "from:auto-confirm@amazon.com subject:Ordered after:2025/01/01"

const HOME = process.env.HOME ?? "/home/walton"
const BODY_CACHE = `${HOME}/.cache/monarch-amazon-orders`

export async function orderEmails(): Promise<readonly EmailMessage[]> {
  return cachedMessages({ query: GMAIL_QUERY, cacheDir: BODY_CACHE, label: "order confirmations" })
}

export async function candidateCharges(): Promise<readonly Movement[]> {
  return amazonMovements((amount) => amount < 0)
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const writing = argv.includes("--write")
  const reverting = argv.includes("--revert")
  const only = argv.includes("--only") ? argv[argv.indexOf("--only") + 1] : null
  const auth = await monarchHeaders()

  const { transactions } = monarchClient(auth)

  if (reverting) {
    await revertFromSnapshot(auth, transactions, { only, writing })
    return
  }

  const emails = await orderEmails()
  const orders: AmazonOrder[] = []
  let unreadable = 0
  for (const email of emails) {
    const order = parseOrderEmail(email)
    if (order === null) unreadable += 1
    else orders.push(order)
  }
  console.log(`parsed ${orders.length} order(s); ${unreadable} message(s) carried no order number`)

  const charges = await candidateCharges()
  console.log(
    `our copy: ${charges.length} Amazon charge(s) since ${AMAZON_SINCE} whose notes read empty`
  )
  const { unique, ambiguous, unmatched } = partition(charges, orders, accountsFor)
  console.log(`\nmatched ${unique.length} charge(s) to exactly one order`)
  console.log(
    `abstained on ${ambiguous.length} charge(s) matching two or more orders — none of these is written`
  )
  console.log(`${unmatched.length} charge(s) matched no order`)
  for (const a of ambiguous) {
    console.log(
      `  abstain ${a.movement.monarchId} ${a.movement.date} ` +
        `${(a.movement.amountCents / 100).toFixed(2)}: ${a.candidates.map((o) => o.orderNumber).join(", ")}`
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const all = (await transactions({ startDate: AMAZON_SINCE, endDate: today })).filter(isAmazon)
  console.log("")
  takeSnapshot(all)

  let targets = unique
  if (only !== null) {
    const named = unique.find((m) => m.movement.monarchId === only)
    if (named === undefined) {
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
    targets = [named]
  }

  let written = 0
  let declined = 0
  let repaired = 0
  for (const { movement, candidate: order } of targets) {
    const applied = await applyNote(
      { auth, fetchDay: transactions, writing },
      movement,
      order.orderNumber,
      noteFor(order)
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
        `  wrote ${movement.monarchId} [${applied.tagCount} tag(s)] ${order.orderNumber}: ${applied.note}`
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
