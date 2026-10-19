import { resolve } from "node:path"
import { monarchClient } from "akasha/alan/harness/monarch/modules/client/monarch-client.module.code.ts"
import { monarchHeaders } from "akasha/alan/harness/monarch/modules/credential/monarch-credential.module.code.ts"
import {
  array,
  bool,
  num,
  object,
  optional,
  str,
} from "akasha/alan/harness/monarch/modules/shape/monarch-shape.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { firstDay } from "akasha/command/argument/pages/first-day.argument.ts"
import { plaidItem } from "akasha/command/argument/pages/plaid-item.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { plaidCheck as page } from "akasha/command/pages/plaid/check/plaid-check.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"

const PLAID = "https://production.plaid.com"

const PAGE_TYPE = "plaid-item"

const DAYS_APART = 3

const DAY_MS = 86_400_000

const PAGE_SIZE = 500

const TIMEOUT_MS = 30_000

const CENTS = 100

const DAY = /^\d{4}-\d{2}-\d{2}$/

export type PlaidRow = {
  readonly id: string
  readonly date: string
  readonly amount: number
  readonly name: string
}

export type MonarchRow = {
  readonly date: string
  readonly amount: number
}

type Keys = {
  readonly clientId: string
  readonly secret: string
  readonly accessToken: string
}

function centsOf(amount: number): number {
  return Math.round(amount * CENTS)
}

function daysApart(one: string, other: string): number {
  return Math.abs(Date.parse(one) - Date.parse(other)) / DAY_MS
}

type Pair = { readonly plaid: number; readonly monarch: number; readonly gap: number }

export function unmatched(
  plaid: readonly PlaidRow[],
  monarch: readonly MonarchRow[]
): readonly PlaidRow[] {
  const byCents = new Map<number, number[]>()
  monarch.forEach((row, at) => {
    const cents = centsOf(row.amount)
    byCents.set(cents, [...(byCents.get(cents) ?? []), at])
  })
  const pairs: Pair[] = []
  plaid.forEach((row, at) => {
    for (const other of byCents.get(-centsOf(row.amount)) ?? []) {
      const gap = daysApart(row.date, monarch[other]?.date ?? "")
      if (gap <= DAYS_APART) pairs.push({ plaid: at, monarch: other, gap })
    }
  })
  pairs.sort((a, b) => a.gap - b.gap || a.plaid - b.plaid || a.monarch - b.monarch)
  const paired = new Set<number>()
  const taken = new Set<number>()
  for (const pair of pairs) {
    if (paired.has(pair.plaid) || taken.has(pair.monarch)) continue
    paired.add(pair.plaid)
    taken.add(pair.monarch)
  }
  return plaid.filter((_, at) => !paired.has(at))
}

export function lineFor(row: PlaidRow): string {
  return `${row.date}  ${(-row.amount).toFixed(2).padStart(10)}  ${row.name}  ${row.id}`
}

export function countSaid(missing: number, weighed: number, from: string): string {
  return `${missing} of ${weighed} posted Plaid rows since ${from} are missing from Monarch`
}

function keysIn(root: string, path: string): Keys | string {
  const held = secretsIn(root, path)
  const clientId = held?.get("clientId")
  const secret = held?.get("secret")
  const accessToken = held?.get("accessToken")
  if (clientId === undefined || secret === undefined || accessToken === undefined) {
    return `${path} holds no clientId, secret and accessToken in the sops file beside it`
  }
  return { clientId, secret, accessToken }
}

function plaidRowIn(value: unknown, path: string): (PlaidRow & { pending: boolean }) | null {
  const o = object(value, path)
  const merchant = optional(o.merchant_name, `${path}.merchant_name`, str)
  return {
    id: str(o.transaction_id, `${path}.transaction_id`),
    date: str(o.date, `${path}.date`),
    amount: num(o.amount, `${path}.amount`),
    name: merchant ?? str(o.name, `${path}.name`),
    pending: bool(o.pending, `${path}.pending`),
  }
}

async function plaidPosted(keys: Keys, from: string): Promise<readonly PlaidRow[]> {
  const rows: PlaidRow[] = []
  let cursor: string | null = null
  for (;;) {
    const response = await fetch(`${PLAID}/transactions/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: keys.clientId,
        secret: keys.secret,
        access_token: keys.accessToken,
        count: PAGE_SIZE,
        ...(cursor === null ? {} : { cursor }),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const body = object(await response.json(), "transactions/sync")
    if (!response.ok) {
      throw new Error(
        `Plaid refused with ${String(body.error_code)}: ${String(body.error_message)}`
      )
    }
    array(body.added, "added").forEach((each, at) => {
      const row = plaidRowIn(each, `added[${at}]`)
      if (row === null || row.pending || row.date < from) return
      rows.push({ id: row.id, date: row.date, amount: row.amount, name: row.name })
    })
    cursor = str(body.next_cursor, "next_cursor")
    if (!bool(body.has_more, "has_more")) return rows
  }
}

function dayBefore(day: string, days: number): string {
  return new Date(Date.parse(day) - days * DAY_MS).toISOString().slice(0, 10)
}

async function monarchPosted(from: string): Promise<readonly MonarchRow[]> {
  const client = monarchClient(await monarchHeaders())
  const today = new Date().toISOString().slice(0, 10)
  const rows = await client.transactions({ startDate: from, endDate: today })
  return rows.filter((row) => !row.pending).map((row) => ({ date: row.date, amount: row.amount }))
}

async function checked(root: string, path: string, from: string): Promise<Answer> {
  const keys = keysIn(root, path)
  if (typeof keys === "string") return refusedBy([keys], DATA)
  const plaid = await plaidPosted(keys, from)
  const earliest = plaid.reduce((first, row) => (row.date < first ? row.date : first), from)
  const monarch = await monarchPosted(dayBefore(earliest, DAYS_APART))
  const missing = [...unmatched(plaid, monarch)].sort((a, b) => a.date.localeCompare(b.date))
  return told([...missing.map(lineFor), countSaid(missing.length, plaid.length, from)])
}

export async function plaidCheck(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [plaidItem, firstDay])
  if ("refused" in read) return mistaking([...read.refused])
  const from = read.taken.firstDay
  if (!DAY.test(from)) return mistaking([`\`${from}\` is no day, which is said as YYYY-MM-DD`])
  const root = resolve(given.root)
  const found = listedAt(root, PAGE_TYPE, read.taken.plaidItem)[0]
  if (found === undefined) {
    return mistaking([`\`${read.taken.plaidItem}\` names no plaid-item page, so no bank is read`])
  }
  try {
    return await checked(root, found.path, from)
  } catch (thrown) {
    return refusedBy([whyOf(thrown), "nothing was written"], OPERATIONAL)
  }
}
