import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { answeredAsJson } from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"

const TOOK_IT = "work@example.com took the change to event abc123"

test("a call the calendar took is answered as the value it gave, laid out as JSON", async () => {
  const held = await answeredAsJson(async () => ({ id: "abc123" }))

  expect(held.code).toBe(0)
  expect(held.report.join("")).toContain("abc123")
})

test("a call that threw after the calendar took the write names that write in its refusal", async () => {
  const held = await answeredAsJson(async (done) => {
    done.push(TOOK_IT)
    throw new OperationalError("the reply would not read")
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TOOK_IT])
  expect(held.refusals[0]).toContain("the reply would not read")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain(TOOK_IT)
})

test("a call that threw before the calendar took anything names no write", async () => {
  const held = await answeredAsJson(async () => {
    throw new OperationalError("the calendar would not answer")
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a call that threw a fault of no known kind is operational rather than seventy", async () => {
  const held = await answeredAsJson(async () => {
    throw new Error("the reply was not the shape asked for")
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals.join(" ")).toContain("the reply was not the shape asked for")
})
