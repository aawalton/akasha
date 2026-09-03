import { textAt } from "@akasha/command-system/asking"

export type Said = {
  readonly held: ReadonlyMap<string, string>
  readonly bare: ReadonlySet<string>
  readonly loose: readonly string[]
}

export type Reading = { readonly said: Said } | { readonly refused: string }

export type Prose = { readonly text: string | undefined } | { readonly refused: string }

export const JSON_SAID = "--json"

export const FROM_FILE = "-file"

const FLAG_MARK = "-"

export function twinsOf(flags: readonly string[]): readonly string[] {
  return flags.flatMap((one) => [one, `${one}${FROM_FILE}`])
}

export function saidIn(
  argv: readonly string[],
  valued: readonly string[],
  bare: readonly string[],
  loose: number
): Reading {
  const held = new Map<string, string>()
  const flagged = new Set<string>()
  const left: string[] = []
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (bare.includes(one)) {
      flagged.add(one)
      continue
    }
    if (valued.includes(one)) {
      const value = argv[at]
      at += 1
      if (value === undefined || value === "") {
        return { refused: `\`${one}\` takes a value, and this call names none after it` }
      }
      if (held.has(one)) {
        return { refused: `\`${one}\` is named twice, so which is meant is unsettled` }
      }
      held.set(one, value)
      continue
    }
    if (one.startsWith(FLAG_MARK)) return { refused: `\`${one}\` is nothing this takes` }
    if (left.length >= loose) return { refused: `\`${one}\` is one word more than this takes` }
    left.push(one)
  }
  return { said: { held, bare: flagged, loose: left } }
}

export function proseIn(said: Said, flag: string): Prose {
  const value = said.held.get(flag)
  const fromFile = `${flag}${FROM_FILE}`
  const path = said.held.get(fromFile)
  if (value !== undefined && path !== undefined) {
    return { refused: `\`${flag}\` and \`${fromFile}\` each carry it, and this call gives both` }
  }
  if (value !== undefined) return { text: value }
  if (path === undefined) return { text: undefined }
  const read = textAt(path)
  if (read === null) return { refused: `\`${fromFile}\` ${path} could not be read as text` }
  return { text: read }
}

export function firstOf(said: Said, flag: string): string | undefined {
  return said.held.get(flag) ?? said.loose[0]
}
