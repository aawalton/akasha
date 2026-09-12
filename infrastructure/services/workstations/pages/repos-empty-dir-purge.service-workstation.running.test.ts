import { expect, mock, test } from "bun:test"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

const HANDED: string[][] = []

const binaryRunning = await import(
  "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts",
  () => ({
    ...binaryRunning,
    runBinary: (argv: readonly string[]) => {
      HANDED.push([...argv])
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/repos-empty-dir-purge.service-workstation.running.code.ts"
)

const SHELL = "bash"
const SCRIPT_ENDING = ".shell.sh"

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run hands the binary runner the shell and the script rather than a command line", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
  expect(HANDED[0]?.length).toBe(2)
})

test("the shell handed the script is the one a shell script is read by", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]?.[0]).toBe(SHELL)
})

test("the script handed the shell is a shell script under the checkout", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]?.[1]?.startsWith(`${checkoutAt()}/`)).toBe(true)
  expect(HANDED[0]?.[1]?.endsWith(SCRIPT_ENDING)).toBe(true)
})

test("the run spawns nothing of its own, so the binary runner is the only way out", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})
