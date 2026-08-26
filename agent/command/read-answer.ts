
export const ANSWER_CEILING = 28_000

const READ_COMMAND = "ops read"

export function costOf(lines: readonly string[]): number {
  let total = 0
  for (const line of lines) total += new TextEncoder().encode(line).length + 1
  return total
}

export interface Left {
  readonly named: string
}

export function restCall(left: readonly Left[], full: boolean): readonly string[] {
  if (left.length === 0) return []
  const one = left.length === 1
  const named = left.map((at) => `--file-path ${at.named}`).join(" ")
  return [
    `read:   ${left.length} file${one ? "" : "s"} ${one ? "was" : "were"} left unread here: the rest of the ` +
      `set runs past ${ANSWER_CEILING} characters, which is the ceiling this prints to, and a file broken ` +
      `off partway is a body the record would say reached you whole. This call takes what is left:`,
    `${READ_COMMAND}${full ? " --full" : ""} ${named}`,
  ]
}
