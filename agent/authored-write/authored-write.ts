import { writerId } from "../writer.ts"
import { unreadBeforeWrite, type Writing } from "./read-before-write.ts"

export function refusalsForAuthoredWrite(
  root: string,
  writing: readonly Writing[]
): readonly string[] {
  return unreadBeforeWrite(root, writing, writerId())
}

export function heldToWhatItsAuthorRead(root: string, writing: readonly Writing[]): void {
  const said = refusalsForAuthoredWrite(root, writing)
  if (said.length === 0) return
  process.stderr.write(`${said.join("\n")}\nnothing was written\n`)
  process.exit(1)
}
