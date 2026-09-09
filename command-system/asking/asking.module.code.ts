import { readFileSync } from "node:fs"
import { join } from "node:path"
import { editsAt } from "@akasha/changes/edits-keeping"
import type { Judging } from "@akasha/checks/judging"
import { agentPathOf } from "@akasha/context/warranting"
import type { Change } from "@akasha/pages/change"
import { isMissing } from "@akasha/utils/fs/missing"
import type { Answer, Given, Kind } from "../calling/calling.module.code.ts"
import { preparing, sequenced } from "../change-preparing/change-preparing.module.code.ts"
import { runningOf } from "../drafting/drafting.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { CHECKING_AT, gateBuilt, NO_GATE } from "../gate-building/gate-building.module.code.ts"
import { passedOver, reachedIn } from "../judged-saying/judged-saying.module.code.ts"
import type { Drafted, FileEdit, Landed, Refused } from "../landing/landing.module.code.ts"
import { baseOf, changeOf, landing } from "../landing/landing.module.code.ts"
import {
  asReadIn,
  carryLanded,
  NO_OWING,
  recordLanded,
} from "../landing-reading/landing-reading.module.code.ts"
import {
  draftedSaid,
  filledSaid,
  formattedSaid,
  pathsOf,
  reported,
  type Saying,
} from "../landing-saying/landing-saying.module.code.ts"
import { installingIn } from "../manifest-locking/manifest-locking.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
import { type Carry, type Reading, SUBAGENT_MARK } from "../reading/reading.module.code.ts"
import type { Minted } from "../value-minting/value-minting.module.code.ts"
import { mintingOnto } from "../value-minting/value-minting.module.code.ts"
import { unwarrantedIn } from "../warrant-owing/warrant-owing.module.code.ts"

export const DRY_RUN = "--dry-run"

export const BREAK_GLASS = "--break-the-glass"

const NOTHING = "nothing was judged and nothing was written"

export const NO_CHECKS = "runs no check, so this landing was judged by none"

export type Asked = {
  readonly changes: readonly FileEdit[]
  readonly message: string
  readonly dryRun: boolean
  readonly glass: string | null
  readonly saying: Saying
  readonly read?: string | null
  readonly moves?: readonly FileMove[]
  readonly readings?: readonly Carry[]
  readonly draft?: boolean
  readonly reaching?: () => undefined
}

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

export function unloadable(why: string): Answer {
  return {
    report: [],
    refusals: [
      `the checks could not be loaded from ${CHECKING_AT}, so no check could run — ${why}`,
      `${NOTHING} — say \`${BREAK_GLASS} <reason>\` to land without the checks, and both the reason and this are in the commit`,
    ],
    code: 3,
  }
}

type Bypass = {
  readonly reason: string
  readonly said: string
  readonly recorded: boolean
}

export function glassSaid(reason: string): string {
  return `no check ran — the glass was broken for: ${reason}`
}

export function bypassedIn(message: string, reason: string): string {
  return `${message}\n\nChecks-bypassed: ${reason}`
}

export function noCheckSaid(slug: string): string {
  return `a \`${slug}\` change ${NO_CHECKS}`
}

function bypassIn(given: Given, asked: Asked): Bypass | null {
  if (asked.glass !== null)
    return { reason: asked.glass, said: glassSaid(asked.glass), recorded: true }
  const kind = given.changeKind
  if (kind === undefined || kind.runsChecks) return null
  const said = noCheckSaid(kind.slug)
  return { reason: said, said, recorded: false }
}

export function unloadableIn(message: string, broken: string): string {
  return `${message}\nChecks-unloadable: ${broken}`
}

function messageWith(asked: Asked, bypass: Bypass | null, broken: string | null): string {
  const held =
    bypass === null || !bypass.recorded ? asked.message : bypassedIn(asked.message, bypass.reason)
  return broken === null ? held : unloadableIn(held, broken)
}

export function wroteAndTook(said: Landed): readonly string[] {
  return [...said.wrote.map((one) => `wrote ${one}`), ...said.took.map((one) => `took away ${one}`)]
}

export function counted(many: number, one: string): string {
  return `${many} ${one}${many === 1 ? "" : "s"}`
}

async function reporting(
  root: string,
  asked: Asked,
  gate: Judging,
  aside: readonly string[],
  over: Change | null
): Promise<Answer> {
  const paths = pathsOf(asked.changes)
  const change =
    over ?? changeOf(root, { base: baseOf(root), edits: asked.changes, moves: asked.moves ?? [] })
  const held = { said: await gate.over(change), woke: gate.checksFor(change).length }
  if (held.said.length > 0) {
    return {
      report: [],
      refusals: [
        ...held.said.map((one) => `${one.path} — ${one.reason}`),
        `nothing was written — ${DRY_RUN} writes nothing either way`,
      ],
      code: 3,
    }
  }
  return {
    report: [
      ...aside,
      passedOver(counted, held.woke, reachedIn(paths), paths.length),
      `nothing was written — ${DRY_RUN}`,
    ],
    refusals: [],
    code: 0,
  }
}

const PRESENCE_AT = "seat-system/subagents/presence/subagent-presence.module.code.ts"

const PRESENCE_LOG = "subagent-presence.log"

const PUTTING_UP = "write"

const NO_AGENT_PAGE =
  "a patch is kept beside the page of the agent drafting it, and this call names no such page"

const PUT_UP =
  "A subagent's page is put up by the `state-subagent` hook at SubagentStart, which asks for that" +
  " landing and does not wait on it, so a landing refused there leaves the subagent working with" +
  ` no page. What that landing said is in \`${PRESENCE_LOG}\` under the seat's own folder.` +
  " This puts the page up, run from a terminal rather than from an agent's shell, which refuses" +
  " a program named inside the akasha folder:"

export function puttingUpSaid(root: string, agentId: string | null): string {
  const mark = agentId === null ? -1 : agentId.indexOf(SUBAGENT_MARK)
  const held =
    agentId === null || mark <= 0
      ? "<the seat> <the id the subagent runs under> <the kind it was dispatched as> <the seat's id>"
      : `<the seat> ${agentId.slice(mark + SUBAGENT_MARK.length)}` +
        ` <the kind it was dispatched as> ${agentId.slice(0, mark)}`
  return `bun ${join(root, PRESENCE_AT)} ${root} ${PUTTING_UP} ${held}`
}

async function draftingAsked(
  given: Given,
  asked: Asked,
  gate: Judging,
  message: string,
  asRead: readonly Reading[],
  aside: readonly string[]
): Promise<Answer> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null) {
    const said = `${NO_AGENT_PAGE}. ${PUT_UP}\n  ${puttingUpSaid(given.root, given.agentId)}`
    return mistaking([said])
  }
  const unread = unwarrantedIn(given, asked.changes)
  if (unread.length > 0) return { report: [], refusals: unread, code: 3 }
  let said: Drafted | Refused
  try {
    said = await landing(
      given.root,
      asked.changes,
      message,
      gate,
      given.writer,
      asked.read ?? null,
      asRead,
      asked.moves ?? [],
      { page }
    )
  } catch (thrown) {
    return { report: [], refusals: [`nothing was drafted — ${whyOf(thrown)}`], code: 3 }
  }
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  return {
    report: draftedSaid(said, editsAt(page), aside),
    refusals: [],
    code: 0,
  }
}

export async function landingAsked(given: Given, asked: Asked): Promise<Answer> {
  if (asked.dryRun && asked.glass !== null) {
    return mistaking([
      `${DRY_RUN} reports what the checks say and ${BREAK_GLASS} runs none, so together they report nothing`,
    ])
  }
  let minted: Minted
  try {
    minted = mintingOnto(given.root, asked.changes)
  } catch (thrown) {
    return { report: [], refusals: [`${NOTHING} — ${whyOf(thrown)}`], code: 3 }
  }
  const base = baseOf(given.root)
  const prepared = preparing(
    given.root,
    base,
    sequenced(asked.changes, minted.edits),
    asked.moves ?? []
  )
  if ("refusals" in prepared) return mistaking([...prepared.refusals, NOTHING])
  const formatting = prepared.formatting
  const aside = [
    ...filledSaid(minted.filled),
    ...formattedSaid(formatting.formatted),
    ...prepared.said,
  ]
  const held: Asked = { ...asked, changes: prepared.changes }
  const bypass = bypassIn(given, held)
  const built = gateBuilt(given.root)
  if ("broken" in built && bypass === null) return unloadable(built.broken)
  const broken = "broken" in built ? built.broken : null
  const gate = bypass === null && "gate" in built ? built.gate : NO_GATE
  held.reaching?.()
  if (held.dryRun) return await reporting(given.root, held, gate, aside, prepared.over)
  const message = messageWith(held, bypass, broken)
  const asRead = asReadIn(given, prepared.authored)
  if (held.draft === true) return await draftingAsked(given, held, gate, message, asRead, aside)
  let said: Landed | Refused
  try {
    said = await landing(
      given.root,
      held.changes,
      message,
      gate,
      given.writer,
      held.read ?? null,
      asRead,
      held.moves ?? [],
      null,
      prepared.over
    )
  } catch (thrown) {
    return {
      report: [],
      refusals: [`nothing was committed and what was written was put back — ${whyOf(thrown)}`],
      code: 3,
    }
  }
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  carryLanded(
    given.root,
    base,
    runningOf(given.changeKind),
    held.changes,
    held.readings ?? [],
    NO_OWING
  )
  recordLanded(given, prepared.authored)
  const put = installingIn(given.root, held.changes, held.moves ?? [])
  return {
    report: reported(counted, said, {
      saying: held.saying,
      plainly: wroteAndTook,
      changes: held.changes,
      bypassed: bypass === null ? null : bypass.said,
      broken,
      checks: gate.named.length,
      aside: [...aside, ...put.said],
    }),
    refusals: put.wrong,
    code: put.wrong.length === 0 ? 0 : 3,
  }
}

export const MECHANICAL: Kind = {
  slug: "change-mechanical",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
}
