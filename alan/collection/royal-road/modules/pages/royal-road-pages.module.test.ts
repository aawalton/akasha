import { expect, test } from "bun:test"
import {
  passing,
  steadily,
} from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"

const WAITS = [1, 2, 3]

function answering(...steps: readonly (number | Error)[]): {
  readonly send: () => Promise<Response>
  readonly sent: () => number
} {
  let at = 0
  return {
    send: () => {
      const step = steps[Math.min(at, steps.length - 1)]
      at += 1
      if (step instanceof Error) return Promise.reject(step)
      return Promise.resolve(new Response("body", { status: step }))
    },
    sent: () => at,
  }
}

function waited(): { readonly wait: (ms: number) => Promise<void>; readonly waits: number[] } {
  const waits: number[] = []
  return {
    wait: (ms) => {
      waits.push(ms)
      return Promise.resolve()
    },
    waits,
  }
}

test("a challenge, a throttle and a server fault are each passing", () => {
  expect([403, 429, 500, 502, 503].map(passing)).toEqual([true, true, true, true, true])
})

test("a success and any other refusal are not passing", () => {
  expect([200, 302, 400, 401, 404].map(passing)).toEqual([false, false, false, false, false])
})

test("an answer that is not passing is taken at once", async () => {
  const { send, sent } = answering(200)
  const { wait, waits } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(200)
  expect(sent()).toBe(1)
  expect(waits).toEqual([])
})

test("a passing answer is sent again until one is not", async () => {
  const { send, sent } = answering(403, 500, 200)
  const { wait, waits } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(200)
  expect(sent()).toBe(3)
  expect(waits).toEqual([1, 2])
})

test("a failed connection is sent again", async () => {
  const { send } = answering(new Error("curl exited 28"), 200)
  const { wait } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(200)
})

test("a refusal that is not passing is not sent again", async () => {
  const { send, sent } = answering(404, 200)
  const { wait } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(404)
  expect(sent()).toBe(1)
})

test("an answer still passing on the last sending is handed back", async () => {
  const { send, sent } = answering(503)
  const { wait, waits } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(503)
  expect(sent()).toBe(4)
  expect(waits).toEqual(WAITS)
})

test("a connection still failing on the last sending throws", async () => {
  const { send } = answering(new Error("curl exited 7"))
  const { wait } = waited()
  await expect(steadily(send, wait, WAITS)).rejects.toThrow("curl exited 7")
})
