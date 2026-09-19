import { expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  askedFor,
  filing,
} from "akasha/command/modules/mechanical-filing/mechanical-filing.module.code.ts"
import { TERMINAL } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"

const GIVEN: Given = {
  root: "/repo",
  calledAs: "akasha track",
  from: "/repo",
  writer: null,
  agentId: null,
}

const AT = "akasha/one/one.held.ts"

test("a body to write goes in through the change adding a file of any kind", () => {
  const asked = askedFor([{ kind: "add", path: AT, content: "alpha\n" }])

  expect(asked).toEqual([
    {
      at: `${changeMechanical.slug}/${addFileOfAnyKind.slug}`,
      given: { at: AT, body: "alpha\n" },
    },
  ])
})

test("a path to take away goes through the change removing a file", () => {
  const asked = askedFor([{ kind: "remove", path: AT }])

  expect(asked).toEqual([
    { at: `${changeMechanicalFile.slug}/${removeFile.slug}`, given: { at: AT } },
  ])
})

test("a refusal the reading answers with is passed back untouched", async () => {
  const said = await filing([], GIVEN, TERMINAL)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("asks for nothing")
})

test("a call refused lands nothing and reports nothing", async () => {
  const said = await filing(["--content-file", "body.txt"], GIVEN, TERMINAL)
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})

const COMMIT = "1".repeat(40)

const LANDED: Applied = {
  base: "0".repeat(40),
  landed: [AT],
  formatted: [],
  said: [],
  wrong: ["the install stopped"],
  commit: COMMIT,
}

test("a landing that wrote before it went wrong names what it wrote and the commit", async () => {
  const piped = () => ({ bytes: new TextEncoder().encode("alpha\n") })
  const said = await filing(["--file-path", AT], GIVEN, piped, () => Promise.resolve(LANDED))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the install stopped"])
  expect(said.report).toContain(`landed ${AT}`)
  expect(said.report).toContain(`committed as ${COMMIT}`)
})

test("a call that threw after the landing committed names that commit in its refusal", async () => {
  const piped = () => ({ bytes: new TextEncoder().encode("alpha\n") })
  const said = await filing(
    ["--file-path", AT],
    GIVEN,
    piped,
    (_root, _asked, _message, writing) => {
      writing?.done?.push(COMMIT)
      throw new Error("the work after that commit stopped")
    }
  )
  expect(said.refusals.join("\n")).toContain(COMMIT)
})
