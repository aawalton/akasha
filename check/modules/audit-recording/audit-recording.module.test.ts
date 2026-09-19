import { afterAll, expect, test } from "bun:test"
import {
  auditPageAt,
  type Beside,
  costKept,
  type Recording,
  roundCosted,
  verdictSent,
} from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import type { Verdict } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { opening } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Held } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const LOGS = "audit.logs"

const PAGE = "akasha/one.check-code.ts"

const CLEAN: Verdict = {
  commit: "abc",
  ranAt: "2026-01-01T00:00:00.000Z",
  refusals: [],
  unrun: false,
}

const ONE: Beside = { slug: "typecheck", page: PAGE, root: "/nowhere" }

const DONE: Held = {
  code: 0,
  signal: null,
  out: new Uint8Array(),
  err: "",
  cpuSeconds: 2.5,
  peakBytes: 1024,
  peakMeasured: true,
}

type Row = { readonly page: string; readonly under: string; readonly line: string }

function catching(): { readonly record: Recording; readonly rows: Row[] } {
  const rows: Row[] = []
  return {
    record: (page, under, line) => {
      rows.push({ page, under, line })
      return Promise.resolve(`${page}.${under}.1.uncommitted.jsonl`)
    },
    rows,
  }
}

const refusing: Recording = () => Promise.resolve(null)

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("the page a round's cost is kept beside is asked of the index", () => {
  expect(auditPageAt(process.cwd())).toContain("audit.command.ts")
})

test("what a whole round cost is sent saying a round ran it rather than a command", async () => {
  const held = catching()
  const at = await roundCosted(process.cwd(), opening(), 2, held.record)
  expect(at).not.toBeNull()
  expect(held.rows.length).toBe(1)
  expect(held.rows[0]?.under).toBe("entries")
  const said = JSON.parse(held.rows[0]?.line ?? "")
  expect(said.phase).toBe("round")
  expect(said.ran).toBe("audit")
  expect(said.refusals).toBe(2)
})

test("a root whose index names no audit command records nothing", async () => {
  const bare = scratch.rootFor("akasha-audit-recording-bare-")
  nothingFiled(bare)
  expect(auditPageAt(bare)).toBeNull()
  expect(await roundCosted(bare, opening(), 0, refusing)).toBeNull()
})

test("a verdict is sent beside the check's page under the part it is kept in", async () => {
  const held = catching()
  const at = await verdictSent(PAGE, "typecheck", CLEAN, LOGS, held.record)
  expect(at).toBe(`${PAGE}.${LOGS}.1.uncommitted.jsonl`)
  expect(held.rows.length).toBe(1)
  expect(held.rows[0]?.page).toBe(PAGE)
  expect(held.rows[0]?.under).toBe(LOGS)
})

test("a verdict sent states the check that ran, the commit it answers for and the phase", async () => {
  const held = catching()
  await verdictSent(PAGE, "typecheck", { ...CLEAN, refusals: ["one.ts — no"] }, LOGS, held.record)
  const said = JSON.parse(held.rows[0]?.line ?? "")
  expect(said.ran).toBe("typecheck")
  expect(said.commit).toBe("abc")
  expect(said.phase).toBe("audit")
  expect(said.refused).toEqual(["one.ts — no"])
  expect(said.unrun).toBe(false)
})

test("a row is sent as one line, the newline being the append's to put on", async () => {
  const held = catching()
  await verdictSent(PAGE, "typecheck", CLEAN, LOGS, held.record)
  await costKept(ONE, DONE, Date.now(), [], LOGS, held.record)
  for (const row of held.rows) expect(row.line).not.toContain("\n")
})

test("a row the pages refused answers as no file part rather than throwing", async () => {
  expect(await verdictSent(PAGE, "typecheck", CLEAN, LOGS, refusing)).toBe(null)
  expect(await costKept(ONE, DONE, Date.now(), [], LOGS, refusing)).toBe(null)
})

test("what a check run apart cost is sent beside that check's page", async () => {
  const held = catching()
  const began = Date.now()
  await costKept(ONE, DONE, began, [{ path: "one.ts", reason: "no" }], LOGS, held.record)
  expect(held.rows[0]?.page).toBe(PAGE)
  const said = JSON.parse(held.rows[0]?.line ?? "")
  expect(said.ran).toBe("typecheck")
  expect(said.phase).toBe("audit")
  expect(said.childCpuSeconds).toBe(2.5)
  expect(said.peakBytes).toBe(1024)
  expect(said.refusals).toBe(1)
  expect(said.refused).toEqual(["one.ts — no"])
  expect(said.ranAt).toBe(new Date(began).toISOString())
})

test("a run that threw is recorded as one nothing measured", async () => {
  const held = catching()
  const threw = [{ path: "one.ts", reason: "died apart", threw: true }]
  await costKept(ONE, DONE, Date.now(), threw, LOGS, held.record)
  expect(JSON.parse(held.rows[0]?.line ?? "").unrun).toBe(true)
})

test("a commit no tree answers for is recorded as none rather than made up", async () => {
  const held = catching()
  await costKept(ONE, DONE, Date.now(), [], LOGS, held.record)
  expect(JSON.parse(held.rows[0]?.line ?? "").commit).toBe("")
})
