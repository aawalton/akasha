import { afterEach, expect, test } from "bun:test"
import { fetchingIs, fetchingIsOverHttp, fetchSpotify } from "./spotify-fetching.module.code.ts"

afterEach(() => {
  fetchingIsOverHttp()
})

test("a replacement answers every call made while the replacement holds", async () => {
  const seen: string[] = []
  fetchingIs(async (url) => {
    seen.push(url)
    return new Response("{}", { status: 200 })
  })
  const answered = await fetchSpotify("https://example.invalid/one", { method: "GET" })
  expect(answered.status).toBe(200)
  expect(seen).toEqual(["https://example.invalid/one"])
})

test("a replacement is given what the caller asked for", async () => {
  let held: RequestInit | undefined
  fetchingIs(async (_url, init) => {
    held = init
    return new Response("{}", { status: 200 })
  })
  await fetchSpotify("https://example.invalid/one", { method: "PUT", body: "a-body" })
  expect(held?.method).toBe("PUT")
  expect(held?.body).toBe("a-body")
})
