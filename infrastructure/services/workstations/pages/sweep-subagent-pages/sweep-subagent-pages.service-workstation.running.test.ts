import { expect, mock, test } from "bun:test"
import { OK, OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"

const CALLED: (readonly string[])[] = []

const WROTE: string[] = []

const sweeping = await import(
  "akasha/commands/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts"
)

let answer = { code: OK, report: [] as string[], refusals: [] as string[] }

mock.module(
  "akasha/commands/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts",
  () => ({
    ...sweeping,
    agentSubagentSweep: (argv: readonly string[]) => {
      CALLED.push(argv)
      return Promise.resolve(answer)
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/sweep-subagent-pages/sweep-subagent-pages.service-workstation.running.code.ts"
)

function watching(): () => undefined {
  const had = process.stdout.write.bind(process.stdout)
  WROTE.length = 0
  process.stdout.write = ((one: string) => {
    WROTE.push(one)
    return true
  }) as typeof process.stdout.write
  return () => {
    process.stdout.write = had
    return undefined
  }
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a tick asks the sweep to remove rather than only to report", async () => {
  CALLED.length = 0
  answer = { code: OK, report: [], refusals: [] }
  const stop = watching()
  try {
    await running.runService()
  } finally {
    stop()
  }
  expect(CALLED).toEqual([["--remove"]])
})

test("a tick that took nothing away says nothing at all", async () => {
  answer = {
    code: OK,
    report: ["40 subagent page(s): 6 working, 0 stale", "STALE none"],
    refusals: [],
  }
  const stop = watching()
  try {
    await running.runService()
  } finally {
    stop()
  }
  expect(WROTE).toEqual([])
})

test("a tick names each page that went and leaves the rest of the census unsaid", async () => {
  answer = {
    code: OK,
    report: [
      "40 subagent page(s): 6 working, 1 stale",
      "agents/subagents/pages/a/a.subagent.ts went",
    ],
    refusals: [],
  }
  const stop = watching()
  try {
    await running.runService()
  } finally {
    stop()
  }
  expect(WROTE).toEqual(["agents/subagents/pages/a/a.subagent.ts went\n"])
})

test("a tick a held lock refused says the refusal and still ends well", async () => {
  answer = { code: OPERATIONAL, report: [], refusals: ["another landing held the lock"] }
  const stop = watching()
  try {
    await expect(running.runService()).resolves.toBeUndefined()
  } finally {
    stop()
  }
  expect(WROTE).toEqual(["another landing held the lock\n"])
})

test("a sweep that threw is carried out rather than swallowed, so a failed run fails the unit", async () => {
  mock.module(
    "akasha/commands/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts",
    () => ({
      ...sweeping,
      agentSubagentSweep: () => Promise.reject(new Error("the index could not be read")),
    })
  )
  await expect(running.runService()).rejects.toThrow("the index could not be read")
})
