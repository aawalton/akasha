import { HELP, HELP_SHORT } from "akasha/commands/modules/calling/calling.module.code.ts"

const DASH = "-"

export function helpIn(
  argv: readonly string[],
  calledAs: string,
  lines: readonly string[]
): readonly string[] | null {
  if (argv[0] !== HELP && argv[0] !== HELP_SHORT) return null
  return [calledAs, "", ...lines]
}

export function wordlessIn(argv: readonly string[], said: string): string | null {
  const one = argv[0]
  if (one === undefined) return null
  if (one.startsWith(DASH)) return `a ${said} takes no flag, and this call named \`${one}\``
  return `a ${said} takes no word, and this call named \`${one}\``
}
