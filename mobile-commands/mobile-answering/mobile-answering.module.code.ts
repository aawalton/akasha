import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import { resolveApp } from "@akasha/mobile-cli/mobile-app"
import { attachWebview, requireDrivingState } from "@akasha/mobile-cli/sim-driver"
import type { SimSessionState } from "@akasha/mobile-cli/sim-session"
import { whyOf } from "../../commands/modules/fault-saying/fault-saying.module.code.ts"

export const APP_SAID = "--app"

export const UDID_SAID = "--udid"

export const JSON_SAID = "--json"

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

export function bareWordAs(said: Said, flag: string): Reading<Said> {
  if (said.loose.length === 0) return said
  if (said.loose.length > 1) {
    const extra = said.loose
      .slice(1)
      .map((one) => `\`${one}\``)
      .join(", ")
    return {
      refused: [`this takes one bare word representing \`${flag}\`, and ${extra} followed it`],
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

export async function driving(): Promise<SimSessionState> {
  return await attachWebview(requireDrivingState())
}
