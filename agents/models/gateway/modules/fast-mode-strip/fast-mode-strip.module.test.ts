import { expect, test } from "bun:test"
import {
  ANTHROPIC_BETA_HEADER,
  FAST_MODE_BETA_PREFIX,
  FAST_SPEED,
  hasFastModeBeta,
  isFastModeBody,
  requestsFastMode,
  stripFastMode,
  stripFastModeBeta,
  stripSpeedFromBody,
} from "./fast-mode-strip.module.code.ts"

const encodeText = (text: string): ArrayBuffer => {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

const encodeJson = (value: unknown): ArrayBuffer => encodeText(JSON.stringify(value))

const readBody = (body: ArrayBuffer | null): string | null =>
  body == null ? null : new TextDecoder().decode(body)

const betaHeaders = (value: string | null): Headers => {
  const headers = new Headers()
  if (value != null) headers.set(ANTHROPIC_BETA_HEADER, value)
  return headers
}

test("a body asks for fast mode by a speed field reading fast", () => {
  expect(isFastModeBody(encodeJson({ speed: FAST_SPEED }))).toBe(true)
  expect(isFastModeBody(encodeJson({ speed: "slow" }))).toBe(false)
  expect(isFastModeBody(encodeJson({ model: "m" }))).toBe(false)
  expect(isFastModeBody(null)).toBe(false)
})

test("a beta header asks for fast mode by a token starting fast-mode-", () => {
  expect(hasFastModeBeta(`other, ${FAST_MODE_BETA_PREFIX}1`)).toBe(true)
  expect(hasFastModeBeta("other,another")).toBe(false)
  expect(hasFastModeBeta("")).toBe(false)
  expect(hasFastModeBeta(null)).toBe(false)
})

test("a request asking in the body or in the beta header is a fast-mode request", () => {
  expect(requestsFastMode(encodeJson({ speed: FAST_SPEED }), null)).toBe(true)
  expect(requestsFastMode(null, `${FAST_MODE_BETA_PREFIX}1`)).toBe(true)
  expect(requestsFastMode(encodeJson({ model: "m" }), "other")).toBe(false)
  expect(requestsFastMode(null, null)).toBe(false)
})

test("stripping the body drops the speed field", () => {
  expect(readBody(stripSpeedFromBody(encodeJson({ speed: FAST_SPEED })))).toBe("{}")
})

test("stripping the body keeps the fields beside speed", () => {
  const stripped = readBody(stripSpeedFromBody(encodeJson({ a: 1, speed: FAST_SPEED, b: 2 })))
  expect(stripped).toBe('{"a":1,"b":2}')
})

test("a body carrying no speed field strips to nothing", () => {
  expect(stripSpeedFromBody(encodeJson({ a: 1 }))).toBeNull()
  expect(stripSpeedFromBody(encodeJson({}))).toBeNull()
})

test("a body that is no JSON object strips to nothing", () => {
  expect(stripSpeedFromBody(encodeText("not json"))).toBeNull()
  expect(stripSpeedFromBody(encodeJson([1, 2]))).toBeNull()
  expect(stripSpeedFromBody(encodeJson(null))).toBeNull()
  expect(stripSpeedFromBody(encodeJson({ speed: 3 }))).toBeNull()
})

test("stripping a beta header drops the tokens starting fast-mode-", () => {
  expect(stripFastModeBeta(`${FAST_MODE_BETA_PREFIX}1`)).toBe("")
  expect(stripFastModeBeta(`${FAST_MODE_BETA_PREFIX}1, ${FAST_MODE_BETA_PREFIX}2`)).toBe("")
})

test("stripping a beta header keeps the tokens not starting fast-mode-", () => {
  expect(stripFastModeBeta(`other, ${FAST_MODE_BETA_PREFIX}1, another`)).toBe("other,another")
  expect(stripFastModeBeta("other,another")).toBeNull()
  expect(stripFastModeBeta("")).toBeNull()
  expect(stripFastModeBeta(null)).toBeNull()
})

test("a beta header left with no token is deleted rather than sent empty", () => {
  const strip = stripFastMode({
    bodyBuffer: encodeJson({ model: "m", speed: FAST_SPEED }),
    headers: betaHeaders(`${FAST_MODE_BETA_PREFIX}1`),
  })
  expect(strip?.headers.has(ANTHROPIC_BETA_HEADER)).toBe(false)
  const kept = stripFastMode({
    bodyBuffer: null,
    headers: betaHeaders(`other, ${FAST_MODE_BETA_PREFIX}1`),
  })
  expect(kept?.headers.get(ANTHROPIC_BETA_HEADER)).toBe("other")
})

test("a strip that changes neither the body nor the beta header returns nothing", () => {
  const unchanged = stripFastMode({
    bodyBuffer: encodeJson({ m: 1 }),
    headers: betaHeaders("other"),
  })
  expect(unchanged).toBeNull()
  expect(stripFastMode({ bodyBuffer: null, headers: betaHeaders(null) })).toBeNull()
})

test("a strip leaves the headers handed in unchanged", () => {
  const headers = betaHeaders(`other, ${FAST_MODE_BETA_PREFIX}1`)
  const strip = stripFastMode({ bodyBuffer: null, headers })
  expect(headers.get(ANTHROPIC_BETA_HEADER)).toBe(`other, ${FAST_MODE_BETA_PREFIX}1`)
  expect(strip?.headers).not.toBe(headers)
  expect(strip?.body).toBeNull()
})

test("a caller reads the beta header under the name anthropic-beta", () => {
  expect(ANTHROPIC_BETA_HEADER).toBe("anthropic-beta")
  const wrongName = new Headers()
  wrongName.set("anthropic-beta-features", `${FAST_MODE_BETA_PREFIX}1`)
  expect(stripFastMode({ bodyBuffer: null, headers: wrongName })).toBeNull()
})

test("a request asking fast mode by header alone loses a speed field reading slow", () => {
  const strip = stripFastMode({
    bodyBuffer: encodeJson({ model: "m", speed: "slow" }),
    headers: betaHeaders(`${FAST_MODE_BETA_PREFIX}1`),
  })
  expect(readBody(strip?.body ?? null)).toBe('{"model":"m"}')
})

test("nothing here chooses which model serves a fast-mode request", () => {
  const strip = stripFastMode({
    bodyBuffer: encodeJson({ model: "claude-opus", speed: FAST_SPEED }),
    headers: betaHeaders(null),
  })
  expect(readBody(strip?.body ?? null)).toBe('{"model":"claude-opus"}')
})
