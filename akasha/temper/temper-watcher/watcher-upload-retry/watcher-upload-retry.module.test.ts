import { expect, test } from "bun:test"
import { isRetryableUploadError, withUploadRetry } from "./watcher-upload-retry.module.code.ts"

test("a statement timeout is tried again", () => {
  expect(isRetryableUploadError(new Error("canceling statement due to statement timeout"))).toBe(
    true
  )
})

test("the postgres code for a cancelled statement is tried again", () => {
  expect(isRetryableUploadError(new Error("code 57014"))).toBe(true)
})

test("a gateway failure is tried again", () => {
  expect(isRetryableUploadError(new Error("HTTP 502"))).toBe(true)
  expect(isRetryableUploadError(new Error("HTTP 503"))).toBe(true)
  expect(isRetryableUploadError(new Error("HTTP 504"))).toBe(true)
})

test("a refusal the server meant is not tried again", () => {
  expect(isRetryableUploadError(new Error("HTTP 400"))).toBe(false)
  expect(isRetryableUploadError(new Error("HTTP 500"))).toBe(false)
})

test("what was thrown but is no error is not tried again", () => {
  expect(isRetryableUploadError("statement timeout")).toBe(false)
})

test("an upload that works is not delayed at all", async () => {
  const delays: number[] = []
  const value = await withUploadRetry(async () => "done", {
    sleep: async (ms) => {
      delays.push(ms)
    },
  })
  expect(value).toBe("done")
  expect(delays).toEqual([])
})

test("anything else thrown reaches the caller on the first attempt", async () => {
  let attempts = 0
  const run = withUploadRetry(async () => {
    attempts++
    throw new Error("HTTP 400")
  })
  await expect(run).rejects.toThrow("HTTP 400")
  expect(attempts).toBe(1)
})

test("the ceiling on the delay doubles with each attempt", async () => {
  const delays: number[] = []
  let attempts = 0
  await withUploadRetry(
    async () => {
      attempts++
      if (attempts < 4) throw new Error("statement timeout")
      return "done"
    },
    {
      baseDelayMs: 100,
      maxDelayMs: 100_000,
      random: () => 1,
      sleep: async (ms) => {
        delays.push(ms)
      },
    }
  )
  expect(delays).toEqual([100, 200, 400])
})

test("the ceiling never rises above the longest delay allowed", async () => {
  const delays: number[] = []
  let attempts = 0
  await withUploadRetry(
    async () => {
      attempts++
      if (attempts < 4) throw new Error("statement timeout")
      return "done"
    },
    {
      baseDelayMs: 100,
      maxDelayMs: 150,
      random: () => 1,
      sleep: async (ms) => {
        delays.push(ms)
      },
    }
  )
  expect(delays).toEqual([100, 150, 150])
})

test("a delay is drawn from below its ceiling", async () => {
  const delays: number[] = []
  let attempts = 0
  await withUploadRetry(
    async () => {
      attempts++
      if (attempts < 2) throw new Error("statement timeout")
      return "done"
    },
    {
      baseDelayMs: 100,
      random: () => 0.5,
      sleep: async (ms) => {
        delays.push(ms)
      },
    }
  )
  expect(delays).toEqual([50])
})

test("the final attempt throws rather than delaying again", async () => {
  const delays: number[] = []
  let attempts = 0
  const run = withUploadRetry(
    async () => {
      attempts++
      throw new Error("statement timeout")
    },
    {
      maxAttempts: 3,
      random: () => 1,
      sleep: async (ms) => {
        delays.push(ms)
      },
    }
  )
  await expect(run).rejects.toThrow("statement timeout")
  expect(attempts).toBe(3)
  expect(delays).toHaveLength(2)
})
