import { describe, expect, test } from "bun:test"
import {
  carriedIn,
  digestOf,
} from "akasha/code/body/modules/carried-file/carried-file.module.code.ts"

const BYTES = new Uint8Array([0, 1, 2, 255, 0, 65, 66, 0])

function carrier(byteLength: number, sha256: string): string {
  const base64 = Buffer.from(BYTES).toString("base64")
  return JSON.stringify({ carriedFile: "icon.ico", byteLength, sha256, base64 })
}

describe("carriedIn", () => {
  test("carries every byte back under the name the carrier states", () => {
    const said = carriedIn(carrier(8, digestOf(BYTES)), "probe")
    expect(said.name).toBe("icon.ico")
    expect([...said.bytes]).toEqual([...BYTES])
  })

  test("refuses a carrier whose byte count disagrees", () => {
    const held = carrier(9, digestOf(BYTES))
    expect(() => carriedIn(held, "probe")).toThrow("says 9 bytes and carries 8")
  })

  test("refuses a carrier whose digest disagrees", () => {
    const held = carrier(8, "0".repeat(64))
    expect(() => carriedIn(held, "probe")).toThrow("says its bytes are")
  })

  test("refuses text that is no json", () => {
    expect(() => carriedIn("{", "probe")).toThrow("is no json")
  })

  test("refuses a json object naming no carried file", () => {
    expect(() => carriedIn('{"base64":""}', "probe")).toThrow("carriedFile")
  })
})
