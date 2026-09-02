import { bodyIn, givenIn, repoAt } from "../../asking/asking.module.test-fixtures.ts"
import type { Answer } from "../../calling/calling.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { write } from "./write.command.code.ts"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const scratch = scratchWorld()

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-write-"), named)
}

export function wroteAt(root: string, path: string, said: readonly string[] = []): Answer {
  return write(["--file-path", path, "--content-file", bodyIn(root), ...said], givenIn(root))
}
