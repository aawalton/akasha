import { describe, expect, test } from "bun:test"
import {
  sandboxLibraryBody,
  sandboxLibraryIn,
} from "akasha/temper/addon/build/deploy-check/modules/sandbox-library-reading/sandbox-library-reading.module.code.ts"

const CAPTURE = {
  apiVersion: 101047,
  globals: { rawlen: "nil", pairs: "function", BAD: 7 },
  libraries: { io: "nil", debug: "table" },
  members: { debug: ["traceback", "getinfo"] },
}

describe("sandboxLibraryIn", () => {
  test("reads the sandbox out of the catalog's capture", () => {
    const held = sandboxLibraryIn(CAPTURE)
    expect(held?.apiVersion).toBe(101047)
    expect(held?.globals).toEqual({ pairs: "function", rawlen: "nil" })
    expect(held?.libraries).toEqual({ debug: "table", io: "nil" })
  })

  test("sorts each library's members", () => {
    expect(sandboxLibraryIn(CAPTURE)?.members).toEqual({ debug: ["getinfo", "traceback"] })
  })

  test("sorts the names, so a capture writes the same body twice", () => {
    expect(Object.keys(sandboxLibraryIn(CAPTURE)?.globals ?? {})).toEqual(["pairs", "rawlen"])
  })

  test("reads no capture as nothing", () => {
    expect(sandboxLibraryIn(undefined)).toBeUndefined()
  })

  test("writes a body ending in one newline", () => {
    const held = sandboxLibraryIn(CAPTURE)
    if (held === undefined) throw new Error("the capture read as nothing")
    expect(sandboxLibraryBody(held).endsWith("}\n")).toBe(true)
  })
})
