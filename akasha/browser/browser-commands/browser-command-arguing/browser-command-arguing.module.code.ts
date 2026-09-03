import type { Answer } from "@akasha/command-system/calling"

export type Said = {
  readonly named: Readonly<Record<string, string | undefined>>
  readonly flags: ReadonlySet<string>
}

export type Reading = Said | { readonly refused: readonly string[] }

export function wordsIn(
  argv: readonly string[],
  valued: readonly string[],
  switches: readonly string[]
): Reading {
  const named: Record<string, string | undefined> = {}
  const flags = new Set<string>()
  const refusals: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (switches.includes(one)) {
      flags.add(one)
      continue
    }
    if (valued.includes(one)) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`\`${one}\` names a value, and nothing followed it`)
        continue
      }
      named[one] = value
      at += 1
      continue
    }
    refusals.push(`\`${one}\` is not an argument this takes`)
  }
  return refusals.length > 0 ? { refused: refusals } : { named, flags }
}

export function countIn(said: string | undefined, flag: string): number | string | undefined {
  if (said === undefined) return undefined
  const read = Number(said)
  if (!Number.isInteger(read) || read < 0) {
    return `\`${flag}\` takes a whole number at or above zero, and \`${said}\` is none`
  }
  return read
}

export function missingOf(
  named: Readonly<Record<string, string | undefined>>,
  wanted: readonly string[]
): readonly string[] {
  return wanted.filter((one) => named[one] === undefined || named[one] === "")
}

export function refusedBy(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}
