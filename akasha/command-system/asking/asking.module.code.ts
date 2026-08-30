import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Judged, Judging } from "../../checks-system/judging/judging.module.code.ts"
import { formattedBody } from "../../code-system/code-format/code-format.module.code.ts"
import type { Answer, Given } from "../calling/calling.module.code.ts"
import { UNNAMED } from "../committing/committing.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { holding } from "../holding/holding.module.code.ts"
import type { Change, Landed, Refused } from "../landing/landing.module.code.ts"
import {
  baseOf,
  CHECKING_AT,
  gateBuilt,
  landing,
  leavingOf,
  NO_GATE,
} from "../landing/landing.module.code.ts"
import { blobIdOf, type Reading, readingIn, recordRead } from "../reading/reading.module.code.ts"
import type { Filled, Minted } from "../value-minting/value-minting.module.code.ts"
import { countingOnto, mintingOnto } from "../value-minting/value-minting.module.code.ts"

export const DRY_RUN = "--dry-run"

export const BREAK_GLASS = "--break-the-glass"

const NOTHING = "nothing was judged and nothing was written"

export type Held = {
  readonly path: string
  readonly was: Uint8Array
}

export type Saying = (said: Landed) => readonly string[]

export type Asked = {
  readonly changes: readonly Change[]
  readonly message: string
  readonly dryRun: boolean
  readonly glass: string | null
  readonly unmoved: readonly Held[]
  readonly saying: Saying
  readonly read?: string | null
}

export type Trouble = {
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export type Formatting = {
  readonly changes: readonly Change[]
  readonly formatted: readonly string[]
}

export function formattingIn(root: string, changes: readonly Change[]): Formatting {
  const held: Change[] = []
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

export function formattedSaid(paths: readonly string[]): readonly string[] {
  return paths.map(
    (one) => `formatted ${one} as it landed — what stands there is not what was handed in`
  )
}

export function filledSaid(filled: readonly Filled[]): readonly string[] {
  return filled.map(
    (one) =>
      `worked out ${one.keys.map((key) => `\`${key}\``).join(", ")} for ${one.path} as it landed` +
      " — a page being created states none of its own"
  )
}

export function mistaking(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}

export function troubling(found: Trouble): Answer | null {
  const said = [...found.mistaken, ...found.wrong]
  if (said.length === 0) return null
  return { report: [], refusals: [...said, NOTHING], code: found.mistaken.length > 0 ? 1 : 2 }
}

export function bytesAt(at: string): Uint8Array | null {
  try {
    return readFileSync(at)
  } catch {
    return null
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
  const bytes = bytesAt(at)
  return bytes === null ? null : textOf(bytes)
}

function sameBytes(one: Uint8Array | null, two: Uint8Array): boolean {
  if (one === null || one.byteLength !== two.byteLength) return false
  for (let at = 0; at < one.byteLength; at += 1) {
    if (one[at] !== two[at]) return false
  }
  return true
}

function alsoUnmoved(judging: Judging, held: readonly Held[]): Judging {
  return {
    named: judging.named,
    over: (leaving) => {
      const moved: Judged[] = []
      for (const one of held) {
        if (sameBytes(bytesAt(join(leaving.root, one.path)), one.was)) continue
        moved.push({
          path: one.path,
          reason:
            "changed after this call read it, so the body worked out for it is not the body on disk — run it again",
        })
      }
      return moved.length > 0 ? moved : judging.over(leaving)
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

function messageWith(asked: Asked, broken: string | null): string {
  if (asked.glass === null) return asked.message
  const held = `${asked.message}\n\nChecks-bypassed: ${asked.glass}`
  return broken === null ? held : `${held}\nChecks-unloadable: ${broken}`
}

export function wroteAndTook(said: Landed): readonly string[] {
  return [...said.wrote.map((one) => `wrote ${one}`), ...said.took.map((one) => `took away ${one}`)]
}

export function counted(many: number, one: string): string {
  return `${many} ${one}${many === 1 ? "" : "s"}`
}

export function passedOver(checks: number, paths: number): string {
  if (checks === 0) {
    return `no check runs at this phase, so the ${counted(paths, "path")} asked for went unjudged`
  }
  return `${counted(checks, "check")} passed over the ${counted(paths, "path")} asked for`
}

export function judgedBy(checks: number, paths: number): string {
  if (checks === 0) {
    return `no check runs at this phase, so the ${counted(paths, "path")} asked for landed unjudged`
  }
  return `${counted(checks, "check")} judged the ${counted(paths, "path")} asked for, and none refused`
}

export function committedLine(said: Landed): string {
  if (said.commit === null) return "nothing was committed — what was asked for already stands"
  if (said.commit === UNNAMED) return "committed — the commit could not be named"
  return `committed as ${said.commit}`
}

function reportOf(
  said: Landed,
  asked: Asked,
  broken: string | null,
  checks: number,
  aside: readonly string[]
): readonly string[] {
  const found = [...asked.saying(said)]
  found.push(...aside)
  if (asked.glass === null) {
    found.push(judgedBy(checks, asked.changes.length))
  } else {
    found.push(`no check ran — the glass was broken for: ${asked.glass}`)
    if (broken !== null) {
      found.push(
        `the checks could not be loaded from ${CHECKING_AT} either, so none could have run — ${broken}`
      )
    }
  }
  found.push(...said.noted.map((one) => `the index took less than the whole of this — ${one}`))
  found.push(committedLine(said))
  return found
}

function reported(
  said: Landed,
  asked: Asked,
  broken: string | null,
  checks: number,
  aside: readonly string[]
): readonly string[] {
  try {
    return reportOf(said, asked, broken, checks, aside)
  } catch (thrown) {
    return [
      ...wroteAndTook(said),
      ...aside,
      committedLine(said),
      `the report could not be built — ${whyOf(thrown)}`,
    ]
  }
}

function reporting(root: string, asked: Asked, gate: Judging): Answer {
  const said = holding(root, () =>
    gate.over(leavingOf(root, { base: baseOf(root), changed: asked.changes }))
  )
  if (said.length > 0) {
    return {
      report: [],
      refusals: [
        ...said.map((one) => `${one.path} — ${one.reason}`),
        `nothing was written — ${DRY_RUN} writes nothing either way`,
      ],
      code: 3,
    }
  }
  return {
    report: [
      passedOver(gate.named.length, asked.changes.length),
      `nothing was written — ${DRY_RUN}`,
    ],
    refusals: [],
    code: 0,
  }
}

export function recordLanded(given: Given, changes: readonly Change[]): undefined {
  if (given.agentId === null) return
  for (const one of changes) {
    if (one.body === null) continue
    recordRead(given.root, given.agentId, {
      path: one.path,
      oid: blobIdOf(one.body),
      seenAt: Date.now(),
      mechanicalOid: null,
    })
  }
}

export function asReadIn(given: Given, changes: readonly Change[]): readonly Reading[] {
  if (given.agentId === null) return []
  const held: Reading[] = []
  for (const one of changes) {
    const seen = readingIn(given.root, given.agentId, one.path)
    if (seen !== null) held.push(seen)
  }
  return held
}

export function landingAsked(given: Given, asked: Asked): Answer {
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
  const aside = [...filledSaid(minted.filled), ...formattedSaid(formatting.formatted)]
  const held: Asked = { ...asked, changes: formatting.changes }
  const built = gateBuilt(given.root)
  if ("broken" in built && held.glass === null) return unloadable(built.broken)
  const broken = "broken" in built ? built.broken : null
  const gate = gateFor(held, held.glass === null && "gate" in built ? built.gate : NO_GATE)
  if (held.dryRun) return reporting(given.root, held, gate)
  let said: Landed | Refused
  try {
    said = landing(
      given.root,
      held.changes,
      messageWith(held, broken),
      gate,
      given.writer,
      held.read ?? null,
      asReadIn(given, held.changes),
      countingOnto
    )
  } catch (thrown) {
    return {
      report: [],
      refusals: [`nothing was committed and what was written was put back — ${whyOf(thrown)}`],
      code: 3,
    }
  }
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  recordLanded(given, held.changes)
  return {
    report: reported(said, held, broken, gate.named.length, aside),
    refusals: [],
    code: 0,
  }
}
