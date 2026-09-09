import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { REFUSES_CODE } from "@akasha/testing-system/minting"
import { landingAsked, MECHANICAL, NO_CHECKS } from "../asking/asking.module.code.ts"
import {
  asking,
  checking,
  drafting,
  git,
  holds,
  mechanically,
  PROGRAM,
  PROPOSED,
  repoWith,
  scratch,
} from "../asking/asking.module.test-fixtures.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { landedMechanically } from "./mechanical-landing.module.code.ts"

afterAll(scratch.sweep)

const ONE_AT = "akasha/one.ts"

function anotherLanded(root: string): undefined {
  writeFileSync(join(root, ONE_AT), "another lane wrote this\n")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "another lane"])
}

test("a program's landing is refused where a path moved between what it read and what it lands on", async () => {
  const root = repoWith()
  const was = baseOf(root)
  anotherLanded(root)
  const said = await landingAsked(
    {
      root,
      calledAs: "akasha change apply",
      from: root,
      writer: null,
      agentId: null,
      changeKind: MECHANICAL,
    },
    asking({
      changes: [{ path: ONE_AT, body: bytes(PROPOSED) }],
      read: was,
      saying: () => [],
    })
  )
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("moved in between")
  expect(readFileSync(join(root, ONE_AT), "utf8")).toBe("another lane wrote this\n")
})

test("a program's landing states the commit it read, so nothing it lands is unheld", async () => {
  const root = repoWith()
  const said = await landedMechanically(root, "akasha change apply", PROGRAM, "held")
  expect(said.code).toBe(0)
})

test("a landing made by a program runs no check and writes nothing into the commit", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await landedMechanically(root, "akasha change apply", PROGRAM, "held")
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
  expect(git(root, ["log", "-1", "--pretty=%B"])).not.toContain("Checks-bypassed")
})

test("a landing made by a program is told apart from a glass that was broken", async () => {
  const root = repoWith()
  const said = await landedMechanically(root, "akasha change apply", PROGRAM, "held")
  expect(said.code).toBe(0)
  expect(said.report).toContain(`a \`change-mechanical\` change ${NO_CHECKS}`)
  expect(said.report.join("\n")).not.toContain("the glass was broken")
})

test("a mechanical change lands no authored draft the patch was already holding", async () => {
  const root = repoWith()
  expect((await drafting(root, [])).code).toBe(0)
  expect(await mechanically(root)).toBe(0)
  expect(holds(root, "akasha/two.ts")).toBe(false)
})
