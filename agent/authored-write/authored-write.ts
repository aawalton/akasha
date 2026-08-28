import { writerId } from "../writer.ts"
import { unreadBeforeWrite, type Writing } from "./read-before-write.ts"
import { unreadForSeat } from "./read-what-is-required.ts"

/**
 * Why this write is refused its author, or nothing.
 *
 * ONLY `write` AND `edit` ASK THIS. A write whose body a program decided has no author to judge,
 * and a command that is neither of those is not held to what its caller read — `ops-global` says
 * so. Calling this from anywhere every verb reaches puts the judgment back on all of them.
 */
export function refusalsForAuthoredWrite(
  root: string,
  writing: readonly Writing[]
): readonly string[] {
  const writer = writerId()
  return [...unreadForSeat(writer), ...unreadBeforeWrite(root, writing, writer)]
}

/** The same, printed and exited on, the way a refused gate leaves a command. */
export function heldToWhatItsAuthorRead(root: string, writing: readonly Writing[]): void {
  const said = refusalsForAuthoredWrite(root, writing)
  if (said.length === 0) return
  process.stderr.write(`${said.join("\n")}\nnothing was written\n`)
  process.exit(1)
}
