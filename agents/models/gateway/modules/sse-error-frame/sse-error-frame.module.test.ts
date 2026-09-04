import { expect, test } from "bun:test"
import { buildAnthropicSseErrorFrame } from "./sse-error-frame.module.code.ts"

const DECODER = new TextDecoder()

const DATA_PREFIX = "data: "

function frameText(errorType: string, message: string): string {
  return DECODER.decode(buildAnthropicSseErrorFrame(errorType, message))
}

function frameLines(errorType: string, message: string): readonly string[] {
  return frameText(errorType, message).split("\n")
}

function frameData(errorType: string, message: string): string {
  const line = frameLines(errorType, message)[1] ?? ""
  return line.slice(DATA_PREFIX.length)
}

test("a frame is bytes rather than a string", () => {
  const frame = buildAnthropicSseErrorFrame("api_error", "boom")
  expect(frame).toBeInstanceOf(Uint8Array)
  expect(frame.byteLength).toBeGreaterThan(0)
})

test("a frame names its event error", () => {
  expect(frameLines("api_error", "boom")[0]).toBe("event: error")
})

test("a frame's whole json is on one data line", () => {
  const lines = frameLines("api_error", "boom")
  expect(lines[1]?.startsWith(DATA_PREFIX)).toBe(true)
  expect(JSON.parse(frameData("api_error", "boom"))).toEqual({
    type: "error",
    error: { type: "api_error", message: "boom" },
  })
})

test("a frame ends with the blank line an event is closed by", () => {
  const text = frameText("api_error", "boom")
  expect(text.endsWith("\n\n")).toBe(true)
  expect(text.endsWith("\n\n\n")).toBe(false)
  expect(text.indexOf("\n\n")).toBe(text.length - 2)
})

test("the json is an object whose own type is error", () => {
  const parsed = JSON.parse(frameData("overloaded_error", "busy"))
  expect(parsed).toEqual({
    type: "error",
    error: { type: "overloaded_error", message: "busy" },
  })
})

test("the error type and message passed in are nested under the json's error key", () => {
  const parsed = JSON.parse(frameData("rate_limit_error", "slow down"))
  expect(parsed).toEqual({
    type: "error",
    error: { type: "rate_limit_error", message: "slow down" },
  })
})

test("a newline in a message is escaped into the json rather than ending the frame", () => {
  const message = "one\ntwo\n\nthree"
  const text = frameText("api_error", message)
  const lines = text.split("\n")
  expect(lines.length).toBe(4)
  expect(text.indexOf("\n\n")).toBe(text.length - 2)
  expect(JSON.parse((lines[1] ?? "").slice(DATA_PREFIX.length))).toEqual({
    type: "error",
    error: { type: "api_error", message },
  })
})

test("nothing here chooses which error type a frame carries", () => {
  for (const errorType of ["api_error", "overloaded_error", "not_a_real_kind"]) {
    expect(JSON.parse(frameData(errorType, "m"))).toEqual({
      type: "error",
      error: { type: errorType, message: "m" },
    })
  }
})
