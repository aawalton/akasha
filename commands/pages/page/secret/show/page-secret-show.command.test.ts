import { expect, test } from "bun:test"
import { commitMessage } from "akasha/commands/arguments/pages/commit-message.argument.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { key as keyArgument } from "akasha/commands/arguments/pages/key.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { pageSecretShow } from "akasha/commands/pages/page/secret/show/page-secret-show.command.code.ts"
import { pageSecretShow as page } from "akasha/commands/pages/page/secret/show/page-secret-show.command.ts"
import { listedById } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CALLED_AS = "akasha page secret show"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const AT = listedById(REPO, page.id)?.path ?? ""

const NONE = "nope"

const MISSING_PATH = `\`${CALLED_AS}\` takes \`${filePath.said}\`, and nothing said it`

const MISSING_KEY = `\`${CALLED_AS}\` takes \`${keyArgument.said}\`, and nothing said it`

const NO_VALUE = `\`${keyArgument.said}\` takes a value, and none follows it`

const TWICE = `\`${keyArgument.said}\` is said twice, and one call says it once`

const UNKNOWN =
  `\`${commitMessage.said}\` is no argument \`${CALLED_AS}\` takes — ` +
  `it takes \`${filePath.said}\`, \`${keyArgument.said}\``

const UNDECLARED = `\`${NONE}\` is no secret of ${AT}'s page type, which declares none`

test("a call saying nothing names each argument its page requires, one line each", async () => {
  const said = await pageSecretShow([], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([MISSING_PATH, MISSING_KEY])
})

test("the key flag with nothing after it is refused rather than read as empty", async () => {
  const said = await pageSecretShow([filePath.said, AT, keyArgument.said], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toContain(NO_VALUE)
})

test("the key flag said twice is refused rather than taken once", async () => {
  const said = await pageSecretShow(
    [filePath.said, AT, keyArgument.said, NONE, keyArgument.said, NONE],
    GIVEN
  )
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([TWICE])
})

test("an argument this command's page does not name is refused against the ones it does", async () => {
  const said = await pageSecretShow(
    [filePath.said, AT, keyArgument.said, NONE, commitMessage.said, "why"],
    GIVEN
  )
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toContain(UNKNOWN)
})

test("a key the page type declares no secret for is refused before anything is decrypted", async () => {
  const said = await pageSecretShow([filePath.said, AT, keyArgument.said, NONE], GIVEN)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([UNDECLARED])
})
