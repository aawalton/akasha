import { expect, test } from "bun:test"
import { parseProxyPortFromBaseUrl } from "./supervisor-adopted-claude-port.module.code.ts"

test("a loopback http url states its port", () => {
  expect(parseProxyPortFromBaseUrl("http://localhost:8123")).toBe(8123)
  expect(parseProxyPortFromBaseUrl("http://127.0.0.1:9000/v1")).toBe(9000)
})

test("nothing and the empty string name no port", () => {
  expect(parseProxyPortFromBaseUrl(null)).toBeNull()
  expect(parseProxyPortFromBaseUrl(undefined)).toBeNull()
  expect(parseProxyPortFromBaseUrl("")).toBeNull()
})

test("a url that is not loopback http names no port", () => {
  expect(parseProxyPortFromBaseUrl("https://localhost:8123")).toBeNull()
  expect(parseProxyPortFromBaseUrl("http://example.com:8123")).toBeNull()
})

test("a url with no port and a url that does not parse name no port", () => {
  expect(parseProxyPortFromBaseUrl("http://localhost")).toBeNull()
  expect(parseProxyPortFromBaseUrl("not a url")).toBeNull()
})
