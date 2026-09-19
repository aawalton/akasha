import { expect, test } from "bun:test"
import {
  bodyFor,
  championOf,
  refusalsNew,
  telling,
} from "akasha/check/modules/audit-telling/audit-telling.module.code.ts"
import type { Verdict } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"

const NOW = "2026-09-11T00:00:00.000Z"

const CLEAN: Verdict = { commit: "a", ranAt: NOW, refusals: [], unrun: false }

test("a refusal a check did not have before is new, and one it had is not", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one.ts — no"] }
  const both: Verdict = { ...CLEAN, refusals: ["one.ts — no", "two.ts — no"] }
  expect(refusalsNew(null, red)).toEqual(["one.ts — no"])
  expect(refusalsNew(red, red)).toEqual([])
  expect(refusalsNew(red, both)).toEqual(["two.ts — no"])
  expect(refusalsNew(red, { ...CLEAN, refusals: ["one.ts — at one"] })).toEqual([])
})

test("the one told is read from the pages rather than named in the module", () => {
  expect(championOf(process.cwd())).toMatch(/^[a-z][a-z-]*$/)
})

test("a telling nobody could receive is passed to Alan, saying who it was meant for", async () => {
  const asked: string[] = []
  const bodies: string[] = []
  const why = await telling(
    async (to, body) => {
      asked.push(to)
      bodies.push(body)
      return to === "alan" ? null : "no seat holds that name"
    },
    "thea",
    "a check turned."
  )
  expect(asked).toEqual(["thea", "alan"])
  expect(bodies[1]).toContain("meant for `thea`")
  expect(bodies[1]).toContain("no seat holds that name")
  expect(why).toBeNull()
})

test("a telling Alan was meant for is not passed to Alan a second time", async () => {
  const asked: string[] = []
  const why = await telling(
    async (to) => {
      asked.push(to)
      return "nothing is waiting there"
    },
    "alan",
    "a check turned."
  )
  expect(asked).toEqual(["alan"])
  expect(why).toContain("`alan`")
})

test("a telling neither could take is answered as a refusal rather than thrown", async () => {
  const why = await telling(async () => "nothing is waiting there", "thea", "a check turned.")
  expect(why).toContain("`thea`")
  expect(why).toContain("`alan`")
})

test("what the one told reads names every check that turned and what each refused", () => {
  const said = bodyFor(
    [{ check: "typecheck", verdict: { ...CLEAN, refusals: ["one.ts — no"] } }],
    "abc"
  )
  expect(said).toContain("typecheck")
  expect(said).toContain("one.ts — no")
  expect(said).toContain("abc")
  expect(said).toContain("the audit log beside that check's page")
  expect(said).toContain("1 check newly refusing.")
})

test("a check nothing measured is told and counted apart from one that refused", () => {
  const killed = { ...CLEAN, refusals: ["two.ts — died on SIGKILL apart"], unrun: true }
  const two = { check: "no-re-export", verdict: killed }
  const one = { check: "typecheck", verdict: { ...CLEAN, refusals: ["one.ts — no"] } }
  const said = bodyFor([one, two], "abc")
  expect(said).toContain("found 1 check newly refusing and 1 check nothing measured.")
  expect(said).toContain("`typecheck` refused 1 time:")
  expect(said).toContain("`no-re-export` went unmeasured:")
  expect(said).toContain("died on SIGKILL apart")
  const alone = bodyFor([two], "abc")
  expect(alone).toContain("the audit at abc found 1 check nothing measured.")
  expect(alone).not.toContain("refus")
})

test("a refusal too long for a message is shortened to say how much of it went", () => {
  const whole = `68 test files failed:\n${"a/b.test.ts\n".repeat(400)}`
  const said = bodyFor([{ check: "tests-pass", verdict: { ...CLEAN, refusals: [whole] } }], "abc")
  expect(said).toContain("68 test files failed:")
  expect(said).toContain("lines more)")
  expect(said.length).toBeLessThan(whole.length)
})

test("a message is held to the words a message page carries", () => {
  const refusals = Array.from({ length: 400 }, (_, at) => `akasha/${at}.ts — ${"no ".repeat(90)}`)
  const red = refusals.map((one, at) => ({
    check: `check-${at}`,
    verdict: { ...CLEAN, refusals: [one] },
  }))
  const said = bodyFor(red, "abc")
  expect(new TextEncoder().encode(said).length).toBeLessThan(20000)
  expect(said).toContain("the audit log beside that check's page")
})
