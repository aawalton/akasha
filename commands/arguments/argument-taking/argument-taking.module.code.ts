import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"

export type Naming = { readonly argument: Argument; readonly required?: boolean }

export type Value = string | number | boolean | readonly (string | number)[]

export type Taken = Readonly<Record<string, Value>>

export type Read = { readonly taken: Taken } | { readonly refused: readonly string[] }

const WHOLE = /^\d+$/

function carries(argument: Argument): boolean {
  return argument.value !== "none"
}

function whyRefused(argument: Argument, said: string): string | null {
  if (argument.value === "whole-number" && !WHOLE.test(said)) {
    return `\`${argument.said} ${said}\` is no whole number of nought or more`
  }
  if (argument.value === "true-or-false" && said !== "true" && said !== "false") {
    return `\`${argument.said}\` takes \`true\` or \`false\`, and \`${said}\` is neither`
  }
  return null
}

function heldOf(argument: Argument, said: string): string | number | boolean {
  if (argument.value === "whole-number") return Number(said)
  if (argument.value === "true-or-false") return said === "true"
  return said
}

function unknown(word: string, calledAs: string, every: readonly string[]): string {
  return every.length === 0
    ? `\`${word}\` is no argument \`${calledAs}\` takes, and it takes none`
    : `\`${word}\` is no argument \`${calledAs}\` takes — it takes \`${every.join("`, `")}\``
}

export function takingIn(
  argv: readonly string[],
  calledAs: string,
  naming: readonly Naming[]
): Read {
  const refusals: string[] = []
  const bySaid = new Map(naming.map((one) => [one.argument.said, one]))
  const spellings = [...bySaid.keys()]
  const taken: Record<string, Value> = {}
  const heard = new Set<string>()
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    const held = bySaid.get(word)
    if (held === undefined) {
      refusals.push(unknown(word, calledAs, spellings))
      continue
    }
    const argument = held.argument
    const key = exportedAs(argument.slug)
    if (!carries(argument)) {
      taken[key] = true
      heard.add(word)
      continue
    }
    const next = argv[at + 1]
    if (next === undefined || bySaid.has(next)) {
      refusals.push(`\`${word}\` takes a value, and none follows it`)
      continue
    }
    at += 1
    const why = whyRefused(argument, next)
    if (why !== null) {
      refusals.push(why)
      continue
    }
    if (argument.repeats === true) {
      const before = (taken[key] ?? []) as readonly (string | number)[]
      taken[key] = [...before, heldOf(argument, next) as string | number]
      heard.add(word)
      continue
    }
    if (heard.has(word)) {
      refusals.push(`\`${word}\` is said twice, and one call says it once`)
      continue
    }
    taken[key] = heldOf(argument, next)
    heard.add(word)
  }
  for (const one of naming) {
    if (one.required !== true || heard.has(one.argument.said)) continue
    refusals.push(`\`${calledAs}\` takes \`${one.argument.said}\`, and nothing said it`)
  }
  if (refusals.length > 0) return { refused: refusals }
  for (const one of naming) {
    const key = exportedAs(one.argument.slug)
    if (key in taken) continue
    if (!carries(one.argument)) taken[key] = false
    else if (one.argument.repeats === true) taken[key] = []
  }
  return { taken }
}
