import { readFileSync } from "node:fs"
import { join } from "node:path"
import { isMissing } from "@akasha/utils/fs/missing"
import type { Answer, Kind } from "../calling/calling.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { SUBAGENT_MARK } from "../reading/reading.module.code.ts"

export const BREAK_GLASS = "--break-the-glass"

const NOTHING = "nothing was judged and nothing was written"

export type Trouble = {
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export function mistaking(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}

export function troubling(found: Trouble): Answer | null {
  const said = [...found.mistaken, ...found.wrong]
  if (said.length === 0) return null
  return { report: [], refusals: [...said, NOTHING], code: found.mistaken.length > 0 ? 1 : 2 }
}

export type Reached =
  | { readonly bytes: Uint8Array }
  | { readonly absent: true }
  | { readonly unreadable: string }

export function bytesAt(at: string): Reached {
  try {
    return { bytes: readFileSync(at) }
  } catch (thrown) {
    return isMissing(thrown) ? { absent: true } : { unreadable: whyOf(thrown) }
  }
}

export function textOf(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

export function textAt(at: string): string | null {
  const held = bytesAt(at)
  return "bytes" in held ? textOf(held.bytes) : null
}

export function glassSaid(reason: string): string {
  return `no check ran — the glass was broken for: ${reason}`
}

export function bypassedIn(message: string, reason: string): string {
  return `${message}\n\nChecks-bypassed: ${reason}`
}

export function unloadableIn(message: string, broken: string): string {
  return `${message}\nChecks-unloadable: ${broken}`
}

export function counted(many: number, one: string): string {
  return `${many} ${one}${many === 1 ? "" : "s"}`
}

const PRESENCE_AT = "seat-system/subagents/presence/subagent-presence.module.code.ts"

const PUTTING_UP = "write"

export function puttingUpSaid(root: string, agentId: string | null): string {
  const mark = agentId === null ? -1 : agentId.indexOf(SUBAGENT_MARK)
  const held =
    agentId === null || mark <= 0
      ? "<the seat> <the id the subagent runs under> <the kind it was dispatched as> <the seat's id>"
      : `<the seat> ${agentId.slice(mark + SUBAGENT_MARK.length)}` +
        ` <the kind it was dispatched as> ${agentId.slice(0, mark)}`
  return `bun ${join(root, PRESENCE_AT)} ${root} ${PUTTING_UP} ${held}`
}

export const MECHANICAL: Kind = {
  slug: "change-mechanical",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
}
