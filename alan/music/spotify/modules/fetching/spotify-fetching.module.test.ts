import { expect, test } from "bun:test"
import {
  type Fetching,
  fetchSpotify,
  type Waiting,
} from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"

test("the call passed in answers the request", async () => {
  const seen: string[] = []
  const over: Fetching = async (url) => {
    seen.push(url)
    return new Response("{}", { status: 200 })
  }
  const answered = await fetchSpotify("https://example.invalid/one", { method: "GET" }, over)
  expect(answered.status).toBe(200)
  expect(seen).toEqual(["https://example.invalid/one"])
})

test("the call passed in is given what the caller asked for", async () => {
  let held: RequestInit | undefined
  const over: Fetching = async (_url, init) => {
    held = init
    return new Response("{}", { status: 200 })
  }
  await fetchSpotify("https://example.invalid/one", { method: "PUT", body: "a-body" }, over)
  expect(held?.method).toBe("PUT")
  expect(held?.body).toBe("a-body")
})

test("one call passed in reaches no other call", async () => {
  const seen: string[] = []
  const over: Fetching = async (url) => {
    seen.push(url)
    return new Response("{}", { status: 200 })
  }
  await fetchSpotify("https://example.invalid/one", { method: "GET" }, over)
  const other: string[] = []
  const another: Fetching = async (url) => {
    other.push(url)
    return new Response("{}", { status: 200 })
  }
  await fetchSpotify("https://example.invalid/two", { method: "GET" }, another)
  expect(seen).toEqual(["https://example.invalid/one"])
  expect(other).toEqual(["https://example.invalid/two"])
})

test("a call that throws is tried again and its second answer is taken", async () => {
  const seen: string[] = []
  const over: Fetching = async (url) => {
    seen.push(url)
    if (seen.length === 1) throw new TypeError("Unable to connect")
    return new Response("{}", { status: 200 })
  }
  const waited: number[] = []
  const waiting: Waiting = async (ms) => {
    waited.push(ms)
  }
  const answered = await fetchSpotify(
    "https://example.invalid/one",
    { method: "GET" },
    over,
    waiting
  )
  expect(answered.status).toBe(200)
  expect(seen.length).toBe(2)
  expect(waited).toEqual([1000])
})

test("a call that keeps throwing throws the last error on after three tries", async () => {
  const seen: string[] = []
  const over: Fetching = async (url) => {
    seen.push(url)
    throw new TypeError(`Unable to connect ${seen.length}`)
  }
  const waited: number[] = []
  const waiting: Waiting = async (ms) => {
    waited.push(ms)
  }
  const refused = fetchSpotify("https://example.invalid/one", { method: "GET" }, over, waiting)
  await expect(refused).rejects.toThrow("Unable to connect 3")
  expect(seen.length).toBe(3)
  expect(waited).toEqual([1000, 4000])
})

test("a call that answers is made once and waits for nothing", async () => {
  const seen: string[] = []
  const over: Fetching = async (url) => {
    seen.push(url)
    return new Response("{}", { status: 200 })
  }
  const waited: number[] = []
  const waiting: Waiting = async (ms) => {
    waited.push(ms)
  }
  await fetchSpotify("https://example.invalid/one", { method: "GET" }, over, waiting)
  expect(seen.length).toBe(1)
  expect(waited).toEqual([])
})
