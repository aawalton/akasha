import { describe, expect, test } from "bun:test"
import {
  sandboxLibraryBody,
  sandboxLibraryIn,
} from "akasha/temper/addon/build/deploy-check/modules/sandbox-library-reading/sandbox-library-reading.module.code.ts"

const CAPTURE = `TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@zeta"] =
        {
            ["$AccountWide"] =
            {
                ["sandboxLibraryCatalog"] =
                {
                    ["apiVersion"] = 101047,
                    ["globals"] =
                    {
                        ["rawlen"] = "nil",
                        ["pairs"] = "function",
                        ["BAD"] = 7,
                    },
                    ["libraries"] =
                    {
                        ["io"] = "nil",
                        ["debug"] = "table",
                    },
                    ["members"] =
                    {
                        ["debug"] =
                        {
                            [1] = "traceback",
                            [2] = "getinfo",
                        },
                    },
                },
            },
        },
    },
}
`

describe("sandboxLibraryIn", () => {
  test("reads the sandbox out of the account holding it", () => {
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

  test("reads a file that will not parse as nothing", () => {
    expect(sandboxLibraryIn("this is not lua at all")).toBeUndefined()
  })

  test("reads a capture holding no sandbox as nothing", () => {
    expect(sandboxLibraryIn(`TemperCatalog_SavedVariables =\n{\n}\n`)).toBeUndefined()
  })

  test("writes a body ending in one newline", () => {
    const held = sandboxLibraryIn(CAPTURE)
    if (held === undefined) throw new Error("the capture read as nothing")
    expect(sandboxLibraryBody(held).endsWith("}\n")).toBe(true)
  })
})
