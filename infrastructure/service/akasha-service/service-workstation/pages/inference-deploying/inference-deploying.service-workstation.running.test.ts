import { expect, mock, test } from "bun:test"

const TICKED: string[] = []

let answer: { readonly said: readonly string[]; readonly wrong: readonly string[] } = {
  said: [],
  wrong: [],
}

const looping = await import(
  "akasha/infrastructure/service/akasha-service/modules/deploy-looping/deploy-looping.module.code.ts"
)

mock.module(
  "akasha/infrastructure/service/akasha-service/modules/deploy-looping/deploy-looping.module.code.ts",
  () => ({
    ...looping,
    ticked: (_root: string, kind: string) => {
      TICKED.push(kind)
      return answer
    },
  })
)

const running = await import(
  "akasha/infrastructure/service/akasha-service/service-workstation/pages/inference-deploying/inference-deploying.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns one tick over the inference kind rather than any other", async () => {
  TICKED.length = 0
  answer = { said: ["put `kokoro` up"], wrong: [] }
  await running.runService()
  expect(TICKED).toEqual(["service-inference"])
})

test("a tick that went wrong is thrown, so a failed run is a failed unit", async () => {
  TICKED.length = 0
  answer = { said: [], wrong: ["the tree would not move"] }
  await expect(running.runService()).rejects.toThrow("would not move")
})
