import { afterAll, expect, test } from "bun:test"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import type { Given } from "../../calling/calling.module.code.ts"
import { drafted } from "../../drafting/drafting.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { writing } from "../../scratching/scratching.module.test-fixtures.ts"
import { dropping, patch, showing } from "./patch.command.code.ts"

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const ONE = "akasha/one.page.ts"

const WAS = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"

const NOW = WAS.replace("b\n", "B\n")

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function repo(): string {
  const root = scratch.rootFor("akasha-patch-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  writing(root, ONE, WAS)
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "base", "--", ONE])
  return root
}

function drafting(root: string): undefined {
  expect("why" in drafted(root, PAGE, [{ path: ONE, was: WAS, body: NOW }])).toBe(false)
}

function refs(root: string): string {
  return gitSaid(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/patch"])
}

function given(root: string): Given {
  return { root, calledAs: "akasha patch", from: root, writer: null, agentId: null }
}

test("a word this command carries no act for is refused", () => {
  const said = patch(["frobnicate"], given(repo()))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("is no act of")
})

test("an agent naming no page is refused", () => {
  const said = patch([], given(repo()))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})

test("a call naming no act says nothing is drafted where no patch is kept", () => {
  const said = showing(repo(), PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing is drafted")
})

test("a call naming no act names each path the patch carries", () => {
  const root = repo()
  drafting(root)
  const said = showing(root, PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`changed ${ONE}`)
  expect(said.report.join("\n")).toContain("the patch is kept at")
})

test("a path that moved under the patch is named as moved", () => {
  const root = repo()
  drafting(root)
  writing(root, ONE, WAS.replace("j\n", "J\n"))
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "moved", "--", ONE])
  expect(showing(root, PAGE).report.join("\n")).toContain("moved under the patch")
})

test("a drop takes the patch and the ref keeping its blobs away", () => {
  const root = repo()
  drafting(root)
  const said = dropping(root, PAGE)
  expect(said.code).toBe(0)
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a drop where no patch is kept is no fault", () => {
  const said = dropping(repo(), PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing is drafted")
})
