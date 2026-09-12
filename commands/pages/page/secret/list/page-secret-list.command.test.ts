import { expect, test } from "bun:test"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { key as keyArgument } from "akasha/commands/arguments/pages/key.argument.ts"
import { DATA, INPUT, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { pageSecretList } from "akasha/commands/pages/page/secret/list/page-secret-list.command.code.ts"
import { pageSecretList as page } from "akasha/commands/pages/page/secret/list/page-secret-list.command.ts"
import { listedById } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CALLED_AS = "akasha page secret list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const AT = listedById(REPO, page.id)?.path ?? ""

const MISSING = `\`${CALLED_AS}\` takes \`${filePath.said}\`, and nothing said it`

const NO_VALUE = `\`${filePath.said}\` takes a value, and none follows it`

const TWICE = `\`${filePath.said}\` is said twice, and one call says it once`

const UNKNOWN =
  `\`${keyArgument.said}\` is no argument \`${CALLED_AS}\` takes — ` +
  `it takes \`${filePath.said}\``

test("a call naming no path is refused by the argument its page requires", async () => {
  const said = await pageSecretList([], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([MISSING])
})

test("the path flag with nothing after it is refused rather than read as empty", async () => {
  const said = await pageSecretList([filePath.said], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toContain(NO_VALUE)
})

test("the path flag said twice is refused rather than taken once", async () => {
  const said = await pageSecretList([filePath.said, "one.ts", filePath.said, "two.ts"], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([TWICE])
})

test("an argument this command's page does not name is refused against the ones it does", async () => {
  const said = await pageSecretList([filePath.said, AT, keyArgument.said, "one"], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toContain(UNKNOWN)
})

test("a page that is there is answered with what it holds and what its type declares", async () => {
  const said = await pageSecretList([filePath.said, AT], GIVEN)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("declares no key")
})

test("a path naming no page is refused as data rather than as a mistake", async () => {
  const said = await pageSecretList([filePath.said, "nowhere/none.ts"], GIVEN)
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain("declares no page here")
})
