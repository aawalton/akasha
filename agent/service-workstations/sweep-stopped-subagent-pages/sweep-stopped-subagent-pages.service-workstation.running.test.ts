import { expect, mock, spyOn, test } from "bun:test"
import { SWEEP_HELD } from "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
import { OK, OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const CALLED: (readonly unknown[])[] = []

const WROTE: string[] = []

const taking = await import(
  "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
)

let answer = { code: OK, report: [] as string[], refusals: [] as string[] }

mock.module(
  "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts",
  () => ({
    ...taking,
    stoppedTaken: (...given: readonly unknown[]) => {
      CALLED.push(given)
      return Promise.resolve(answer)
    },
  })
)

const running = await import(
  "akasha/agent/service-workstations/sweep-stopped-subagent-pages/sweep-stopped-subagent-pages.service-workstation.running.code.ts"
)

async function ticked(): Promise<undefined> {
  const wrote = spyOn(process.stdout, "write").mockImplementation(() => true)
  try {
    await running.runService()
  } finally {
    WROTE.length = 0
    for (const one of wrote.mock.calls) WROTE.push(String(one[0]))
    wrote.mockRestore()
  }
  return undefined
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a tick asks for the stopped pages of the main checkout alone", async () => {
  CALLED.length = 0
  answer = { code: OK, report: [], refusals: [] }
  await ticked()
  expect(CALLED).toEqual([[akashaRoot()]])
})

test("a tick that took nothing away says nothing at all", async () => {
  answer = { code: OK, report: [], refusals: [] }
  await ticked()
  expect(WROTE).toEqual([])
})

test("a tick names each page that went and leaves the rest unsaid", async () => {
  answer = {
    code: OK,
    report: [
      "",
      "1 page(s) the census judged STALE are left where they are:",
      "agent/subagent/pages/a/a.subagent.ts went",
    ],
    refusals: [],
  }
  await ticked()
  expect(WROTE).toEqual(["agent/subagent/pages/a/a.subagent.ts went\n"])
})

test("a tick the full census's take held off says so and still ends well", async () => {
  answer = { code: OPERATIONAL, report: [], refusals: [SWEEP_HELD] }
  await ticked()
  expect(WROTE).toEqual([`${SWEEP_HELD}\n`])
})

test("a take that threw is carried out rather than swallowed, so a failed run fails the unit", async () => {
  mock.module(
    "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts",
    () => ({
      ...taking,
      stoppedTaken: () => Promise.reject(new Error("the index could not be read")),
    })
  )
  await expect(running.runService()).rejects.toThrow("the index could not be read")
})
