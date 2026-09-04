import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { saidBy } from "@akasha/command-system/fault-saying"
import { z } from "zod"
import { RELAY_SECRET_HEADER } from "../readout-credential/readout-credential.module.code.ts"
import { type Reading, readingKept } from "../readout-reading/readout-reading.module.code.ts"

export const RELAY_PATH = "/api/readout-relay"

export const RELAY_SECRET_NAME = "READING_RELAY_SECRET"

export const NO_READOUT_NAMED =
  "no readout page was named, so there is no reading to carry. The page a reading stands beside " +
  "is the first of the two arguments this takes."

export const NOWHERE_TO_CARRY_TO =
  "nowhere to carry a reading to was named. The origin of the site the reading is shown on is " +
  "the second of the two arguments this takes."

export const NO_SECRET_TO_CARRY_ON =
  `${RELAY_SECRET_NAME} is not set, so a reading carried would be refused. It is the secret the ` +
  "site names for the machine its readings are taken on."

export const JOURNAL_ERROR_LEVEL = "<3>"

export function noReadoutPageAt(page: string): string {
  return (
    `${JOURNAL_ERROR_LEVEL}relay wiring fault: no readout page is at '${page}', so this relay ` +
    "carries nothing, and will go on carrying nothing until the path it names is put right"
  )
}

export type Relayed = Reading & { readonly readout: string }

export type Sent = (to: URL, init: RequestInit) => Promise<Response>

const relayed = z.object({
  readout: z.string().trim().min(1),
  value: z.number().finite(),
  at: z.string().trim().min(1),
})

const held = new Map<string, Reading>()

export function relayedIn(body: unknown): Relayed | null {
  const parsed = relayed.safeParse(body)
  if (!parsed.success) return null
  if (Number.isNaN(Date.parse(parsed.data.at))) return null
  return parsed.data
}

export function holdRelayed(carried: Relayed): undefined {
  held.set(carried.readout, { value: carried.value, at: carried.at })
}

export function relayedHeld(readout: string): Reading | null {
  return held.get(readout) ?? null
}

export function dropRelayed(): undefined {
  held.clear()
}

export function readoutNamedBy(page: string): string {
  const named = (page.split("/").at(-1) ?? "").split(".")[0] ?? ""
  if (named === "") {
    throw new Error(`'${page}' names no readout, so there is nothing to carry a reading under`)
  }
  return named
}

export async function relayReading(
  to: string,
  secret: string,
  carried: Relayed,
  send: Sent = fetch,
  timeoutMs = 10_000
): Promise<undefined> {
  const at = new URL(RELAY_PATH, to)
  const answered = await send(at, {
    method: "POST",
    headers: { "Content-Type": "application/json", [RELAY_SECRET_HEADER]: secret },
    body: JSON.stringify(carried),
    signal: AbortSignal.timeout(timeoutMs),
  })
  if (!answered.ok) {
    throw new Error(
      `${at.href} answered ${answered.status} for the reading of '${carried.readout}'`
    )
  }
}

export function statedIn(open: Record<string, string | undefined>, name: string): string | null {
  const stated = open[name]?.trim()
  return stated === undefined || stated === "" ? null : stated
}

export function readoutPageAt(root: string, page: string): string | null {
  const full = resolve(root, page)
  return existsSync(full) ? full : null
}

if (import.meta.main) {
  const page = (process.argv[2] ?? "").trim()
  const to = (process.argv[3] ?? "").trim()
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (page === "") {
    process.stderr.write(`${NO_READOUT_NAMED}\n`)
    process.exit(2)
  }
  if (to === "") {
    process.stderr.write(`${NOWHERE_TO_CARRY_TO}\n`)
    process.exit(2)
  }
  if (secret === null) {
    process.stderr.write(`${NO_SECRET_TO_CARRY_ON}\n`)
    process.exit(2)
  }
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  if (readoutPageAt(root, page) === null) {
    process.stderr.write(`${noReadoutPageAt(page)}\n`)
    process.exit(3)
  }
  const kept = readingKept(root, page)
  if (kept === null) {
    process.stderr.write(`${page} stands beside no reading, so there is none to carry\n`)
    process.exit(2)
  }
  try {
    await relayReading(to, secret, { ...kept, readout: readoutNamedBy(page) })
    process.stdout.write(`a reading taken ${kept.at} carried to ${to}\n`)
  } catch (thrown) {
    process.stderr.write(`${saidBy(thrown)}\n`)
    process.exit(1)
  }
}
