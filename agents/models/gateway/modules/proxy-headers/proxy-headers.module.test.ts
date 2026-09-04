import { expect, test } from "bun:test"
import { copyRequestHeaders, copyResponseHeaders } from "./proxy-headers.module.code.ts"

const HOP_BY_HOP_HEADERS = [
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]

function requestWith(headers: Record<string, string>): Request {
  return new Request("https://upstream.example/v1/messages", { method: "POST", headers })
}

function responseWith(headers: Record<string, string>): Response {
  return new Response(null, { headers })
}

function namesOf(headers: Headers): readonly string[] {
  return [...headers.keys()].sort()
}

test("a request drops every hop-by-hop header", () => {
  const headers: Record<string, string> = { "x-keep": "yes" }
  for (const name of HOP_BY_HOP_HEADERS) headers[name] = "v"
  const copied = copyRequestHeaders(requestWith(headers))
  for (const name of HOP_BY_HOP_HEADERS) expect(copied.get(name)).toBeNull()
  expect(namesOf(copied)).toEqual(["x-keep"])
})

test("a request drops its authorization header", () => {
  const copied = copyRequestHeaders(
    requestWith({ authorization: "Bearer secret", "x-keep": "yes" })
  )
  expect(copied.get("authorization")).toBeNull()
  expect(copied.get("x-keep")).toBe("yes")
})

test("a request drops its host header", () => {
  const copied = copyRequestHeaders(requestWith({ host: "seat.example", "x-keep": "yes" }))
  expect(copied.get("host")).toBeNull()
  expect(copied.get("x-keep")).toBe("yes")
})

test("neither direction copies content-length", () => {
  const fromRequest = copyRequestHeaders(requestWith({ "content-length": "4", "x-keep": "yes" }))
  const fromResponse = copyResponseHeaders(responseWith({ "content-length": "4", "x-keep": "yes" }))
  expect(fromRequest.get("content-length")).toBeNull()
  expect(fromResponse.get("content-length")).toBeNull()
  expect(fromRequest.get("x-keep")).toBe("yes")
  expect(fromResponse.get("x-keep")).toBe("yes")
})

test("a response drops content-encoding", () => {
  const copied = copyResponseHeaders(responseWith({ "content-encoding": "gzip", "x-keep": "yes" }))
  expect(copied.get("content-encoding")).toBeNull()
  expect(copied.get("x-keep")).toBe("yes")
})

test("a header no list names is copied with its value unchanged", () => {
  const carried = {
    "content-type": "text/event-stream",
    "anthropic-beta": "one,two",
    "x-request-id": "req_0123",
  }
  const fromRequest = copyRequestHeaders(requestWith(carried))
  const fromResponse = copyResponseHeaders(responseWith(carried))
  for (const [name, value] of Object.entries(carried)) {
    expect(fromRequest.get(name)).toBe(value)
    expect(fromResponse.get(name)).toBe(value)
  }
})

test("a header is matched against a list in lower case", () => {
  const copied = copyRequestHeaders(
    requestWith({ AUTHORIZATION: "Bearer secret", Host: "seat.example", "Content-Length": "4" })
  )
  expect(copied.get("authorization")).toBeNull()
  expect(copied.get("host")).toBeNull()
  expect(copied.get("content-length")).toBeNull()
  expect(namesOf(copied)).toEqual([])
})

test("nothing here adds a header that did not arrive", () => {
  expect(namesOf(copyRequestHeaders(requestWith({ "x-only": "1" })))).toEqual(["x-only"])
  expect(namesOf(copyResponseHeaders(responseWith({ "x-only": "1" })))).toEqual(["x-only"])
  expect(namesOf(copyRequestHeaders(requestWith({})))).toEqual([])
  expect(namesOf(copyResponseHeaders(responseWith({})))).toEqual([])
})

test("a response drops every hop-by-hop header", () => {
  const res = new Response("body", {
    headers: [
      ["connection", "close"],
      ["upgrade", "h2c"],
      ["te", "trailers"],
      ["proxy-authenticate", "Basic"],
      ["x-kept", "yes"],
    ],
  })
  const out = copyResponseHeaders(res)
  expect(out.get("connection")).toBeNull()
  expect(out.get("upgrade")).toBeNull()
  expect(out.get("te")).toBeNull()
  expect(out.get("proxy-authenticate")).toBeNull()
  expect(out.get("x-kept")).toBe("yes")
})

test("a response carrying several set-cookie headers copies every one", () => {
  const res = new Response("body", {
    headers: [
      ["set-cookie", "a=1"],
      ["set-cookie", "b=2"],
    ],
  })
  const out = copyResponseHeaders(res)
  const cookies = [...out].filter(([name]) => name === "set-cookie").map(([, value]) => value)
  expect(cookies.length).toBe(2)
  expect(cookies.join("; ")).toContain("a=1")
  expect(cookies.join("; ")).toContain("b=2")
})
