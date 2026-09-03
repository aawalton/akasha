import { describe, expect, test } from "bun:test"
import { carriedIn, carrierAt, carrierFor, digestOf } from "./carried-file.module.code.ts"

const BYTES = new Uint8Array([0, 1, 2, 255, 0, 65, 66, 0])

describe("carrierFor", () => {
  test("carries every byte back unchanged", () => {
    const said = carriedIn(carrierFor("icon.ico", BYTES), "probe")
    expect(said.name).toBe("icon.ico")
    expect([...said.bytes]).toEqual([...BYTES])
  })

  test("holds no NUL byte of its own", () => {
    expect(carrierFor("icon.ico", BYTES).includes("\0")).toBe(false)
  })

  test("holds the base64 on one line", () => {
    const lines = carrierFor("icon.ico", BYTES).split("\n")
    expect(lines.filter((one) => one.includes('"base64"')).length).toBe(1)
  })

  test("states the digest of what it carries", () => {
    expect(carrierFor("icon.ico", BYTES).includes(digestOf(BYTES))).toBe(true)
  })
})

describe("carriedIn", () => {
  test("refuses a carrier whose byte count disagrees", () => {
    const held = carrierFor("icon.ico", BYTES).replace('"byteLength": 8', '"byteLength": 9')
    expect(() => carriedIn(held, "probe")).toThrow("says 9 bytes and carries 8")
  })

  test("refuses a carrier whose digest disagrees", () => {
    const held = carrierFor("icon.ico", BYTES).replace(digestOf(BYTES), "0".repeat(64))
    expect(() => carriedIn(held, "probe")).toThrow("says its bytes are")
  })

  test("refuses text that is no json", () => {
    expect(() => carriedIn("{", "probe")).toThrow("is no json")
  })

  test("refuses a json object naming no carried file", () => {
    expect(() => carriedIn('{"base64":""}', "probe")).toThrow("carriedFile")
  })
})

describe("carrierAt", () => {
  test("names the beside file the page grammar builds", () => {
    expect(carrierAt("akasha/temper/watcher-tray/watcher-tray.rust-crate.ts", "icon")).toBe(
      "akasha/temper/watcher-tray/watcher-tray.rust-crate.icon.json"
    )
  })
})
