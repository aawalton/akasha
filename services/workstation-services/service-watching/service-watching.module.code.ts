import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { writeMessage } from "@akasha/seat-system/message-file"
import { domainsDrawn } from "akasha/domains/modules/rows/domain-rows.module.code.ts"
import {
  championing,
  deciding,
  type Ledger,
  type Telling,
  told,
} from "../service-alerting/service-alerting.module.code.ts"
import { healthFor } from "../service-health/service-health.module.code.ts"

const LEDGER = ".local/state/workstation-services/service-outages.json"
const FALLBACK = "alan"
const SENDER = "service-watching"
const SAID = "service-watching:"

export type Sent = (to: string, body: string) => Promise<string | null>

export type Ticked = {
  readonly told: readonly string[]
  readonly refused: readonly string[]
}

export function ledgerAt(home: string): string {
  return join(home, LEDGER)
}

export function ledgerIn(text: string): Ledger {
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return {}
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return {}
  const kept: Record<string, { brokenSince: string; toldAt: string | null }> = {}
  for (const [slug, one] of Object.entries(held as Record<string, unknown>)) {
    if (one === null || typeof one !== "object") continue
    const said = one as Record<string, unknown>
    if (typeof said.brokenSince !== "string") continue
    kept[slug] = {
      brokenSince: said.brokenSince,
      toldAt: typeof said.toldAt === "string" ? said.toldAt : null,
    }
  }
  return kept
}

export function ledgerRead(home: string): Ledger {
  const at = ledgerAt(home)
  if (!existsSync(at)) return {}
  try {
    return ledgerIn(readFileSync(at, "utf8"))
  } catch {
    return {}
  }
}

export function ledgerWrite(home: string, ledger: Ledger): undefined {
  const at = ledgerAt(home)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(ledger, null, 2)}\n`)
}

export function passedOn(one: Telling, why: string): string {
  const said = why.endsWith(".") ? why : `${why}.`
  return `${one.body} This was meant for \`${one.to}\`, whom nothing could reach: ${said}`
}

export const sending: Sent = async (to, body) => {
  const wrote = await writeMessage({ to, from: SENDER, warrant: "announce", body })
  return wrote.kind === "refused" ? wrote.detail : null
}

export async function ticking(given: {
  readonly root: string
  readonly home: string
  readonly now: string
  readonly send?: Sent
}): Promise<Ticked> {
  const send = given.send ?? sending
  const health = healthFor(given.root)
  if (typeof health === "string") {
    throw new Error(`${SAID} the services could not be read, so nothing is judged: ${health}`)
  }
  const champion = championing(domainsDrawn(given.root))
  const decided = deciding({
    health,
    champion,
    ledger: ledgerRead(given.home),
    now: given.now,
    fallback: FALLBACK,
  })
  let keeping = decided.keeping
  const done: string[] = []
  const refused: string[] = []
  for (const one of decided.tell) {
    let why = await send(one.to, one.body)
    let reached = one.to
    if (why !== null && one.to !== FALLBACK) {
      reached = FALLBACK
      why = await send(FALLBACK, passedOn(one, why))
    }
    if (why !== null) {
      refused.push(`${one.slug} for \`${one.to}\`: ${why}`)
      continue
    }
    keeping = told(keeping, one.slug, given.now)
    ledgerWrite(given.home, keeping)
    done.push(`${one.slug} to \`${reached}\``)
  }
  ledgerWrite(given.home, keeping)
  return { told: done, refused }
}

export function homeAt(): string {
  const stated = process.env.HOME
  return stated === undefined || stated === "" ? process.cwd() : stated
}

export function rootAt(): string {
  const stated = process.env.AKASHA_ROOT
  return stated === undefined || stated === "" ? process.cwd() : stated
}

if (import.meta.main) {
  const ticked = await ticking({
    root: rootAt(),
    home: homeAt(),
    now: new Date().toISOString(),
  })
  for (const one of ticked.told) process.stdout.write(`${SAID} told ${one}\n`)
  for (const one of ticked.refused) process.stderr.write(`${SAID} nothing told for ${one}\n`)
  if (ticked.refused.length > 0) process.exit(1)
}
