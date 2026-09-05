import { readFileSync } from "node:fs"
import { join } from "node:path"
import { patchAt } from "@akasha/agents/patch-keeping"
import type { Judged, Judging } from "@akasha/checks/judging"
import { formattedBody } from "@akasha/code-system/code-format"
import { agentPathOf } from "@akasha/context/warranting"
import { nameFaultIn } from "@akasha/pages-system/page-export-name"
import { isMissing } from "@akasha/utils-fs/missing"
import type { Answer, Given, Kind } from "../calling/calling.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { CHECKING_AT, gateBuilt, NO_GATE } from "../gate-building/gate-building.module.code.ts"
import { passedOver, reachedIn } from "../judged-saying/judged-saying.module.code.ts"
import type {
  Drafted,
  FileCarry,
  FileEdit,
  Landed,
  Refused,
} from "../landing/landing.module.code.ts"
import { baseOf, changeOf, landing } from "../landing/landing.module.code.ts"
import { asReadIn, recordLanded } from "../landing-reading/landing-reading.module.code.ts"
import {
  draftedSaid,
  filledSaid,
  formattedSaid,
  pathsOf,
  reported,
  type Saying,
} from "../landing-saying/landing-saying.module.code.ts"
import {
  installingIn,
  lockingFor,
  sameBytes,
} from "../manifest-locking/manifest-locking.module.code.ts"
import type { Reading } from "../reading/reading.module.code.ts"
import type { Minted } from "../value-minting/value-minting.module.code.ts"
import { mintingOnto } from "../value-minting/value-minting.module.code.ts"

export const DRY_RUN = "--dry-run"

export const BREAK_GLASS = "--break-the-glass"

const NOTHING = "nothing was judged and nothing was written"

export const NO_CHECKS = "runs no check, so this landing was judged by none"

export type Held = {
  readonly path: string
  readonly was: Uint8Array
}

export type Asked = {
  readonly changes: readonly FileEdit[]
  readonly message: string
  readonly dryRun: boolean
  readonly glass: string | null
  readonly unmoved: readonly Held[]
  readonly saying: Saying
  readonly read?: string | null
  readonly carries?: readonly FileCarry[]
  readonly draft?: boolean
}

export type Trouble = {
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export type Formatting = {
  readonly changes: readonly FileEdit[]
  readonly formatted: readonly string[]
}

export function formattingIn(root: string, changes: readonly FileEdit[]): Formatting {
  const held: FileEdit[] = []
  const formatted: string[] = []
  for (const one of changes) {
    if (one.body === null) {
      held.push(one)
      continue
    }
    const said = formattedBody(root, one.path, one.body)
    if (!said.changed) {
      held.push(one)
      continue
    }
    held.push({ path: one.path, body: said.body })
    formatted.push(one.path)
  }
  return { changes: held, formatted }
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

const SLUG_AT = /^ {2}slug: "([^"]*)",$/m

const PAGE_TYPE_AT = /^ {2}pageTypeSlug: "([^"]*)",$/m

const PAGE_FILE = ".ts"

const REMEDY =
  "Put the page type slug in front of it, as `wake-day-2026-08-20` and" +
  " `great-course-7-days-of-drawing` already do, and name the file for the slug you land"

export function slugComposedIn(path: string, body: Uint8Array): string | null {
  const text = textOf(body)
  if (text === null) return null
  const found = SLUG_AT.exec(text)
  if (found === null || !PAGE_TYPE_AT.test(text)) return null
  const slug = found[1] as string
  const named = path.slice(path.lastIndexOf("/") + 1)
  return named.startsWith(`${slug}.`) ? slug : null
}

export function unexportableIn(changes: readonly FileEdit[]): readonly string[] {
  const said: string[] = []
  for (const one of changes) {
    if (one.body === null || !one.path.endsWith(PAGE_FILE)) continue
    const slug = slugComposedIn(one.path, one.body)
    if (slug === null) continue
    const fault = nameFaultIn(slug)
    if (fault !== null) said.push(`${one.path} — ${fault}. ${REMEDY}`)
  }
  return said
}

function alsoUnmoved(judging: Judging, held: readonly Held[]): Judging {
  return {
    named: judging.named,
    checksFor: judging.checksFor,
    over: async (change) => {
      const moved: Judged[] = []
      for (const one of held) {
        const now = bytesAt(join(change.root, one.path))
        if ("bytes" in now && sameBytes(now.bytes, one.was)) continue
        moved.push({
          path: one.path,
          reason:
            "changed after this call read it, so the body worked out for it is not the body on disk — run it again",
        })
      }
      return moved.length > 0 ? moved : await judging.over(change)
    },
  }
}

export function unloadable(why: string): Answer {
  return {
    report: [],
    refusals: [
      `the checks could not be loaded from ${CHECKING_AT}, so no check could run — ${why}`,
      `${NOTHING} — say \`${BREAK_GLASS} <reason>\` to land without the checks, and both the reason and this stand in the commit`,
    ],
    code: 3,
  }
}

function gateFor(asked: Asked, held: Judging): Judging {
  return asked.unmoved.length === 0 ? held : alsoUnmoved(held, asked.unmoved)
}

type Bypass = {
  readonly reason: string
  readonly said: string
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

export function mechanicallyIn(given: Given): boolean {
  const kind = given.changeKind
  return kind !== undefined && !kind.runsChecks
}

function bypassIn(given: Given, asked: Asked): Bypass | null {
  if (asked.glass !== null) return { reason: asked.glass, said: glassSaid(asked.glass) }
  const kind = given.changeKind
  if (kind === undefined || kind.runsChecks) return null
  const said = noCheckSaid(kind.slug)
  return { reason: said, said }
}

export function unloadableIn(message: string, broken: string): string {
  return `${message}\nChecks-unloadable: ${broken}`
}

function messageWith(asked: Asked, bypass: Bypass | null, broken: string | null): string {
  if (bypass === null) return asked.message
  const held = bypassedIn(asked.message, bypass.reason)
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
  aside: readonly string[]
): Promise<Answer> {
  const paths = pathsOf(asked.changes)
  const change = changeOf(root, { base: baseOf(root), edits: asked.changes })
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
    return mistaking([
      "a patch is kept beside the page of the agent drafting it, and this call names no such page",
    ])
  }
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
      asked.carries ?? [],
      { page, mechanical: mechanicallyIn(given) }
    )
  } catch (thrown) {
    return { report: [], refusals: [`nothing was drafted — ${whyOf(thrown)}`], code: 3 }
  }
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  return {
    report: draftedSaid(counted, said, patchAt(page), aside, gate.named.length),
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
  const formatting = formattingIn(given.root, minted.changes)
  const unexportable = unexportableIn(formatting.changes)
  if (unexportable.length > 0) return mistaking([...unexportable, NOTHING])
  const locking = lockingFor(given.root, baseOf(given.root), formatting.changes)
  const aside = [
    ...filledSaid(minted.filled),
    ...formattedSaid(formatting.formatted),
    ...locking.said,
  ]
  const held: Asked = { ...asked, changes: [...formatting.changes, ...locking.edits] }
  const bypass = bypassIn(given, held)
  const built = gateBuilt(given.root)
  if ("broken" in built && bypass === null) return unloadable(built.broken)
  const broken = "broken" in built ? built.broken : null
  const gate = gateFor(held, bypass === null && "gate" in built ? built.gate : NO_GATE)
  if (held.dryRun) return await reporting(given.root, held, gate, aside)
  const message = messageWith(held, bypass, broken)
  const asRead = asReadIn(given, formatting.changes)
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
      held.carries ?? []
    )
  } catch (thrown) {
    return {
      report: [],
      refusals: [`nothing was committed and what was written was put back — ${whyOf(thrown)}`],
      code: 3,
    }
  }
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  recordLanded(given, formatting.changes)
  const put = installingIn(given.root, held.changes)
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
  runsWarrants: false,
}

export async function landedMechanically(
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string,
  unmoved: readonly Held[] = [],
  agentId: string | null = null
): Promise<Answer> {
  return await landingAsked(
    { root, calledAs, from: root, writer: null, agentId, changeKind: MECHANICAL },
    {
      changes,
      message,
      dryRun: false,
      glass: null,
      unmoved,
      saying: wroteAndTook,
      draft: agentId !== null,
    }
  )
}
