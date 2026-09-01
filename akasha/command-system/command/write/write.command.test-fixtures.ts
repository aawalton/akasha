import { repoAt } from "../../asking/asking.module.test-fixtures.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const scratch = scratchWorld()

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-write-"), named)
}
