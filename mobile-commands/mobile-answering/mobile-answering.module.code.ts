import type { Answer } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import { resolveApp } from "@akasha/mobile-cli/mobile-app"
import { attachWebview, requireDrivingState } from "@akasha/mobile-cli/sim-driver"
import type { SimSessionState } from "@akasha/mobile-cli/sim-session"

export const OK = 0

export const INPUT = 1

export const DATA = 2

export const OPERATIONAL = 3

export const APP_SAID = "--app"

export const UDID_SAID = "--udid"

export const JSON_SAID = "--json"

const CARRIES_A_CODE: ReadonlySet<string> = new Set([
  "ExitError",
  "CliError",
  "InputError",
  "DataError",
  "OperationalError",
])

export type Said = {
  readonly named: Readonly<Record<string, string>>
  readonly loose: readonly string[]
  readonly flags: ReadonlySet<string>
}

export type Reading<T> = T | { readonly refused: readonly string[] }

export function wordsIn(
  argv: readonly string[],
  valued: readonly string[],
  switches: readonly string[]
): Reading<Said> {
  const refusals: string[] = []
  const named: Record<string, string> = {}
  const loose: string[] = []
  const flags = new Set<string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (switches.includes(one)) {
      flags.add(one)
      continue
    }
    if (valued.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`\`${one}\` names a value, and nothing that could be one followed it`)
        continue
      }
      named[one] = value
      continue
    }
    if (one.startsWith("-")) {
      const takes = [...valued, ...switches].map((said) => `\`${said}\``).join(", ")
      refusals.push(`\`${one}\` is no flag this takes — it takes ${takes}`)
      continue
    }
    loose.push(one)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { named, loose, flags }
}

export function standingFor(said: Said, flag: string): Reading<Said> {
  if (said.loose.length === 0) return said
  if (said.loose.length > 1) {
    const extra = said.loose
      .slice(1)
      .map((one) => `\`${one}\``)
      .join(", ")
    return {
      refused: [`this takes one bare word standing for \`${flag}\`, and ${extra} followed it`],
    }
  }
  const bare = said.loose[0]
  if (bare === undefined) return said
  if (said.named[flag] !== undefined) {
    return {
      refused: [
        `\`${bare}\` and \`${flag}\` both name what this takes, and one call names it once`,
      ],
    }
  }
  return { named: { ...said.named, [flag]: bare }, loose: [], flags: said.flags }
}

export function flagsAloneIn(said: Said): readonly string[] {
  return said.loose.map((one) => `\`${one}\` follows nothing this takes — it takes flags alone`)
}

export function countOf(said: string | undefined, flag: string): Reading<number> | null {
  if (said === undefined) return null
  if (!/^\d+$/.test(said)) {
    return {
      refused: [`\`${flag}\` takes a whole number at or above zero, and \`${said}\` is not one`],
    }
  }
  const held = Number(said)
  if (!Number.isSafeInteger(held)) {
    return { refused: [`\`${said}\` is past the largest whole number that can be read`] }
  }
  return held
}

export function appIn(said: Said): Reading<MobileApp> {
  try {
    return resolveApp(said.named[APP_SAID])
  } catch (thrown) {
    return { refused: [whyOf(thrown)] }
  }
}

export function refusedBy(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: INPUT }
}

export function told(report: readonly string[]): Answer {
  return { report, refusals: [], code: OK }
}

export function asJson(value: unknown): Answer {
  return told([JSON.stringify(value)])
}

export function keyedLines(
  entries: ReadonlyArray<readonly [string, string | number | boolean | null | undefined]>
): string[] {
  const lines: string[] = []
  for (const [key, value] of entries) {
    if (value === undefined) continue
    lines.push(`${key}\t${value === null ? "" : value}`)
  }
  return lines
}

export function codeOf(thrown: unknown): number {
  if (thrown instanceof Error && CARRIES_A_CODE.has(thrown.name)) {
    const held = (thrown as { readonly code?: unknown }).code
    if (typeof held === "number" && held >= INPUT && held <= OPERATIONAL) return held
  }
  return OPERATIONAL
}

export function faulted(thrown: unknown): Answer {
  return { report: [], refusals: [whyOf(thrown)], code: codeOf(thrown) }
}

export async function answering(work: () => Answer | Promise<Answer>): Promise<Answer> {
  try {
    return await work()
  } catch (thrown) {
    return faulted(thrown)
  }
}

export async function driving(): Promise<SimSessionState> {
  return await attachWebview(requireDrivingState())
}
