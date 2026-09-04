import { describe, expect, test } from "bun:test"
import { configOf, servingOf, typesIn } from "./typescript-7.code-check.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

describe("the settings the program is built from", () => {
  test("name every ambient type the packages folder holds", () => {
    const held = typesIn(ROOT)
    expect(held.length).toBeGreaterThan(0)
    expect(held).toContain("bun")
  })

  test("carry the files judged", () => {
    const said: { compilerOptions: { types: string[] }; files: string[] } = JSON.parse(
      configOf(ROOT, ["one.ts", "two.ts"])
    )
    expect(said.files).toEqual(["one.ts", "two.ts"])
    expect(said.compilerOptions.types).toContain("bun")
  })
})

describe("what the compiler is served", () => {
  const at = `${ROOT}/tsconfig.typescript-7.json`
  const serving = servingOf(ROOT, at, "{}", (path) =>
    path.endsWith("held.ts") ? "export const held = 1" : undefined
  )

  test("answers the config at the path it was named by", () => {
    expect(serving(at)).toBe("{}")
  })

  test("answers a body the change carries", () => {
    expect(serving(`${ROOT}/held.ts`)).toBe("export const held = 1")
  })

  test("answers a path the change takes away as absent rather than as unknown", () => {
    expect(serving(`${ROOT}/gone.ts`)).toBeNull()
  })

  test("leaves a path outside the checkout to the disk", () => {
    expect(serving("/etc/hostname")).toBeUndefined()
  })
})
