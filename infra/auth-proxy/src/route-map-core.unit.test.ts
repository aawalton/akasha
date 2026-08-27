import { describe, expect, test } from "bun:test"
import { parseRouteMap } from "./route-map-core"

describe("parseRouteMap", () => {
  test("normalizes a bare-string entry to { target }", () => {
    const result = parseRouteMap('{"a.example.com":"http://a:80"}')
    expect(result).toEqual({ "a.example.com": { target: "http://a:80" } })
  })

  test("round-trips an object entry with target and proxy", () => {
    const result = parseRouteMap(
      '{"b.example.com":{"target":"http://b:80","proxy":"http://egress:1055"}}'
    )
    expect(result).toEqual({
      "b.example.com": { target: "http://b:80", proxy: "http://egress:1055" },
    })
  })

  test("normalizes an object entry without proxy to { target }", () => {
    const result = parseRouteMap('{"c.example.com":{"target":"http://c:80"}}')
    expect(result).toEqual({ "c.example.com": { target: "http://c:80" } })
  })

  test("accepts a mixed map of strings and objects", () => {
    const result = parseRouteMap(
      '{"a.example.com":"http://a:80","b.example.com":{"target":"http://b:80","proxy":"http://egress:1055"}}'
    )
    expect(result).toEqual({
      "a.example.com": { target: "http://a:80" },
      "b.example.com": { target: "http://b:80", proxy: "http://egress:1055" },
    })
  })

  test("defaults to an empty map", () => {
    expect(parseRouteMap(undefined)).toEqual({})
  })

  test("rejects an object entry with an unknown key (strict)", () => {
    expect(() =>
      parseRouteMap('{"d.example.com":{"target":"http://d:80","extra":"nope"}}')
    ).toThrow()
  })
})
