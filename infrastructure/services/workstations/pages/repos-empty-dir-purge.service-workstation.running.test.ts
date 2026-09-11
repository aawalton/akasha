import { expect, mock, test } from "bun:test"
import { join } from "node:path"
import { reposEmptyDirPurge } from "akasha/infrastructure/services/workstations/pages/repos-empty-dir-purge.service-workstation.ts"
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

const GAP = " "
const LINE = reposEmptyDirPurge.runs[0]
const SHELL = LINE.slice(0, LINE.indexOf(GAP))
const AT = LINE.slice(LINE.indexOf(GAP) + 1)

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
  expect(HANDED).toEqual([[SHELL, join(checkoutAt(), AT)]])
})

test("the shell handed the script is the shell the page's run line names", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]?.[0]).toBe(SHELL)
})

test("the script handed the shell is the one the page's run line names, under the checkout", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]?.[1]).toBe(join(checkoutAt(), AT))
})

test("the run spawns nothing of its own, so the binary runner is the only way out", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})
