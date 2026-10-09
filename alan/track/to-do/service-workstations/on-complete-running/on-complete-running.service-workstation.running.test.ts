import { expect, mock, test } from "bun:test"

const ROOTS: string[] = []

let answer: { readonly said: readonly string[]; readonly wrong: readonly string[] } = {
  said: [],
  wrong: [],
}

const runner = await import(
  "akasha/alan/track/to-do/modules/on-complete-running/on-complete-running.module.code.ts"
)

mock.module(
  "akasha/alan/track/to-do/modules/on-complete-running/on-complete-running.module.code.ts",
  () => ({
    ...runner,
    depsAt: (root: string) => {
      ROOTS.push(root)
      return {
        hooked: () => [],
        claim: () => ({ act: "none", doneAt: "" }),
        load: async () => ({}),
      }
    },
    ranOnce: async () => answer,
  })
)

const running = await import(
  "akasha/alan/track/to-do/service-workstations/on-complete-running/on-complete-running.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the runner module's own run over the checkout", async () => {
  ROOTS.length = 0
  answer = { said: ["ran the on-complete code of `drink`"], wrong: [] }
  await running.runService()
  expect(ROOTS).toHaveLength(1)
})

test("code that did not finish is thrown, so a failed run is a failed unit", async () => {
  answer = { said: [], wrong: ["the on-complete code of `drink` did not finish: no landing"] }
  await expect(running.runService()).rejects.toThrow("no landing")
})
