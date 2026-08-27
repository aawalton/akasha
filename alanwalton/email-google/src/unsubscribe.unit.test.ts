import { describe, expect, test } from "bun:test"
import { parseListUnsubscribe } from "./unsubscribe"

describe("parseListUnsubscribe", () => {
  test("https only, no post header → httpUrl set, no one-click", () => {
    const r = parseListUnsubscribe("<https://example.com/u?x=1>", undefined)
    expect(r.httpUrl).toBe("https://example.com/u?x=1")
    expect(r.oneClickUrl).toBeUndefined()
    expect(r.mailto).toBeUndefined()
  })

  test("mailto only → mailto parsed, no http", () => {
    const r = parseListUnsubscribe("<mailto:unsub@list.example.com>", undefined)
    expect(r.httpUrl).toBeUndefined()
    expect(r.oneClickUrl).toBeUndefined()
    expect(r.mailto).toEqual({ address: "unsub@list.example.com", subject: undefined })
  })

  test("both https and mailto → both parsed", () => {
    const r = parseListUnsubscribe(
      "<https://example.com/u>, <mailto:unsub@example.com?subject=unsubscribe>",
      undefined
    )
    expect(r.httpUrl).toBe("https://example.com/u")
    expect(r.mailto).toEqual({ address: "unsub@example.com", subject: "unsubscribe" })
  })

  test("one-click present → oneClickUrl = httpUrl (case-insensitive token)", () => {
    const r = parseListUnsubscribe(
      "<https://example.com/oneclick>, <mailto:u@example.com>",
      "List-Unsubscribe=One-Click"
    )
    expect(r.oneClickUrl).toBe("https://example.com/oneclick")
  })

  test("one-click token is case-insensitive and tolerates surrounding text", () => {
    const r = parseListUnsubscribe("<https://e.com/oc>", "  list-unsubscribe=one-click  ")
    expect(r.oneClickUrl).toBe("https://e.com/oc")
  })

  test("post header present but not one-click → no oneClickUrl", () => {
    const r = parseListUnsubscribe("<https://example.com/u>", "Something-Else=Value")
    expect(r.oneClickUrl).toBeUndefined()
    expect(r.httpUrl).toBe("https://example.com/u")
  })

  test("one-click token but no https URL → oneClickUrl stays undefined", () => {
    const r = parseListUnsubscribe("<mailto:u@example.com>", "List-Unsubscribe=One-Click")
    expect(r.oneClickUrl).toBeUndefined()
    expect(r.httpUrl).toBeUndefined()
    expect(r.mailto?.address).toBe("u@example.com")
  })

  test("subject extraction from mailto query", () => {
    const r = parseListUnsubscribe("<mailto:x@y.com?subject=Please%20remove>", undefined)
    expect(r.mailto).toEqual({ address: "x@y.com", subject: "Please remove" })
  })

  test("empty / absent header → all undefined", () => {
    expect(parseListUnsubscribe(undefined, undefined)).toEqual({
      oneClickUrl: undefined,
      httpUrl: undefined,
      mailto: undefined,
    })
    expect(parseListUnsubscribe("", undefined)).toEqual({
      oneClickUrl: undefined,
      httpUrl: undefined,
      mailto: undefined,
    })
  })

  test("http (non-https) URL is not treated as an https affordance", () => {
    const r = parseListUnsubscribe("<http://insecure.example.com/u>", "List-Unsubscribe=One-Click")
    expect(r.httpUrl).toBeUndefined()
    expect(r.oneClickUrl).toBeUndefined()
  })
})
