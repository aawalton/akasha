import { expect, test } from "bun:test"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { builtIn, VALUED } from "akasha/command/modules/file-arguing/file-arguing.module.code.ts"
import type { Piping } from "akasha/command/modules/piping/piping.module.code.ts"
import { terminal } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

const BODY = "export const held = 1\n"

const MECHANICAL = {
  slug: "change-mechanical",
  runsChecks: true,
  writerOwesReading: false,
  readersOweReading: false,
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha tracking", from: root, writer: null, agentId: null }
}

function refusedBy(argv: readonly string[], root = "/repo", piping: Piping = terminal): string {
  const said = builtIn(argv, givenIn(root), piping, MECHANICAL)
  return "code" in said ? said.refusals.join("\n") : ""
}

test("a call naming no file to write and no path to take away is refused", () => {
  expect(refusedBy([])).toContain("asks for nothing")
})

test("a flag this reading does not take is refused", () => {
  expect(refusedBy(["--nowhere"])).toContain("--nowhere")
})

test("a caller names which flags carry no value, and --restated answers where none does", () => {
  expect(refusedBy(["--restated"])).toContain("asks for nothing")
  const said = builtIn(["--restated"], givenIn("/repo"), terminal, MECHANICAL, VALUED, [])
  const refusals = "code" in said ? said.refusals.join("\n") : ""
  expect(refusals).toContain("`--restated` is no flag this takes.")
})

test("a --file-path with nothing after it is refused", () => {
  expect(refusedBy(["--file-path"])).toContain("takes a path, and none follows it")
})

test("a --content-file following no --file-path is refused", () => {
  expect(refusedBy(["--content-file", "body.txt"])).toContain("follows no --file-path")
})

test("a second --file-path opening before the first is closed is refused", () => {
  const said = refusedBy(["--file-path", "akasha/one.ts", "--file-path", "akasha/two.ts"])
  expect(said).toContain("is closed by no --content-file")
})

test("a --file-path that no --content-file closes and nothing piped in is refused", () => {
  expect(refusedBy(["--file-path", "akasha/one.ts"])).toContain("nothing is piped in")
})

test("the body for a file is read from the file --content-file names", () => {
  const root = scratch.rootFor("akasha-file-arguing-")
  const from = put(root, "body.txt", BODY)
  const said = builtIn(
    ["--file-path", "akasha/one.ts", "--content-file", from],
    givenIn(root),
    terminal,
    MECHANICAL
  )
  if ("code" in said) throw new Error(said.refusals.join("\n"))
  expect(said.changes).toEqual([{ kind: "add", path: "akasha/one.ts", content: BODY }])
})

test("a commit message worked out from the paths names the path written", () => {
  const root = scratch.rootFor("akasha-file-arguing-")
  const from = put(root, "body.txt", BODY)
  const said = builtIn(
    ["--file-path", "akasha/one.ts", "--content-file", from],
    givenIn(root),
    terminal,
    MECHANICAL
  )
  if ("code" in said) throw new Error(said.refusals.join("\n"))
  expect(said.message).toBe("write akasha/one.ts")
})

test("a path outside the repository is refused", () => {
  const root = scratch.rootFor("akasha-file-arguing-")
  const from = put(root, "body.txt", BODY)
  const said = refusedBy(["--file-path", "../one.ts", "--content-file", from], root)
  expect(said).toContain("is no path inside the repository")
})

test("a path named more than once by one call is refused", () => {
  const root = scratch.rootFor("akasha-file-arguing-")
  const from = put(root, "body.txt", BODY)
  const said = refusedBy(
    [
      "--file-path",
      "akasha/one.ts",
      "--content-file",
      from,
      "--file-path",
      "akasha/one.ts",
      "--content-file",
      from,
    ],
    root
  )
  expect(said).toContain("is named more than once by one call")
})
