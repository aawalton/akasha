import { put } from "@akasha/testing-system/putting"
import { applied, repoAt } from "../../command-system/asking/asking.module.test-fixtures.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import type { Piping } from "../../command-system/piping/piping.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { edit, editing } from "./edit.command.code.ts"

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const MARKS =
  'import { writeFileSync } from "node:fs"\n' +
  "\n" +
  "export function marks(change) {\n" +
  '  writeFileSync(`${change.root}/ran.txt`, "ran")\n' +
  "  return []\n" +
  "}\n"

export const scratch = scratchWorld()

export function repoWith(named: Readonly<Record<string, string>>): string {
  return repoAt(scratch.rootFor("akasha-edit-"), named)
}

export const givenIn = (root: string) => ({
  root,
  calledAs: "akasha edit",
  from: root,
  writer: null,
  agentId: AGENT,
})

export async function edited(
  root: string,
  argv: readonly string[],
  given: Given = givenIn(root)
): Promise<Answer> {
  return await applied(root, await edit(argv, given), argv, given)
}

export async function editedIn(
  root: string,
  argv: readonly string[],
  piping: Piping,
  given: Given = givenIn(root)
): Promise<Answer> {
  return await applied(root, await editing(argv, given, piping), argv, given)
}

export function stating(root: string, name: string, was: string, now: string): readonly string[] {
  return ["--old-file", put(root, `${name}.old`, was), "--new-file", put(root, `${name}.new`, now)]
}

export function changing(
  root: string,
  name: string,
  was: string,
  now: string,
  path = "akasha/one.ts"
): readonly string[] {
  return ["--file-path", path, ...stating(root, name, was, now)]
}
