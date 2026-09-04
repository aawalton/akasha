import { afterAll, expect, test } from "bun:test"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { drafted } from "../../command-system/drafting/drafting.module.code.ts"
import type { Piping } from "../../command-system/piping/piping.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { writing } from "../../command-system/scratching/scratching.module.test-fixtures.ts"
import { dropping, patch, resolving, showing, showingBody } from "./patch.command.code.ts"

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const ONE = "akasha/one.page.ts"

const TWO = "akasha/two.page.ts"

const WAS = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"

const NOW = WAS.replace("b\n", "B\n")

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const BYTES = new TextEncoder()

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

async function repo(): Promise<string> {
  const root = scratch.rootFor("akasha-patch-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  await writing(root, ONE, WAS)
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "base", "--", ONE])
  return root
}

async function landing(root: string, body: string): Promise<undefined> {
  await writing(root, ONE, body)
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", ONE])
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

function piped(body: string): Piping {
  return () => ({ bytes: BYTES.encode(body) })
}

test("a word this command carries no act for is refused", async () => {
  const said = await patch(["frobnicate"], given(await repo()))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("is no act of")
})

test("an agent naming no page is refused", async () => {
  const said = await patch([], given(await repo()))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})

test("a call naming no act says nothing is drafted where no patch is kept", async () => {
  const said = showing(await repo(), PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing is drafted")
})

test("a call naming no act names each path the patch carries", async () => {
  const root = await repo()
  drafting(root)
  const said = showing(root, PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`changed ${ONE}`)
  expect(said.report.join("\n")).toContain("the patch is kept at")
})

test("a path that moved under the patch is named as moved", async () => {
  const root = await repo()
  drafting(root)
  await landing(root, WAS.replace("j\n", "J\n"))
  expect(showing(root, PAGE).report.join("\n")).toContain("moved under the patch")
})

test("a path the patch carries a conflict at is named as carrying one", async () => {
  const root = await repo()
  drafting(root)
  await landing(root, WAS.replace("b\n", "X\n"))
  const said = showing(root, PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`${ONE} carries a conflict`)
})

test("a patch merging cleanly names no conflict", async () => {
  const root = await repo()
  drafting(root)
  await landing(root, WAS.replace("j\n", "J\n"))
  expect(showing(root, PAGE).report.join("\n")).not.toContain("carries a conflict")
})

test("a body shown is what the patch would leave at that path", async () => {
  const root = await repo()
  drafting(root)
  const said = showingBody(root, PAGE, ["--file-path", ONE])
  expect(said.code).toBe(0)
  expect(`${said.report.join("\n")}\n`).toBe(NOW)
})

test("a body shown carries the marks a conflict left", async () => {
  const root = await repo()
  drafting(root)
  await landing(root, WAS.replace("b\n", "X\n"))
  const said = showingBody(root, PAGE, ["--file-path", ONE])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("B")
  expect(said.report.join("\n")).toContain("X")
})

test("a path the patch carries no body at is not shown", async () => {
  const root = await repo()
  drafting(root)
  const said = showingBody(root, PAGE, ["--file-path", TWO])
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("carries no body at")
})

test("a show naming no path is refused", async () => {
  const root = await repo()
  drafting(root)
  const said = showingBody(root, PAGE, [])
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("names the path to act on")
})

test("a body resolved still carrying conflict marks is refused", async () => {
  const root = await repo()
  drafting(root)
  const body = `a\n<<<<<<< what this change would leave\nB\n=======\nX\n>>>>>>> HEAD\n`
  const said = await resolving(given(root), PAGE, ["--file-path", ONE], piped(body))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("unresolved")
})

test("a resolve where no patch is kept is refused", async () => {
  const root = await repo()
  const said = await resolving(given(root), PAGE, ["--file-path", ONE], piped("held\n"))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("nothing is drafted")
})

test("a resolve naming no path is refused", async () => {
  const root = await repo()
  drafting(root)
  const said = await resolving(given(root), PAGE, [], piped("held\n"))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("names the path to act on")
})

test("a drop takes the patch and the ref keeping its blobs away", async () => {
  const root = await repo()
  drafting(root)
  const said = dropping(root, PAGE)
  expect(said.code).toBe(0)
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a drop where no patch is kept is no fault", async () => {
  const said = dropping(await repo(), PAGE)
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing is drafted")
})
