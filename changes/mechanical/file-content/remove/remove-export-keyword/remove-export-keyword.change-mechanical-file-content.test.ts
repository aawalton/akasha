import { expect, test } from "bun:test"
import { removeExportKeyword } from "akasha/changes/mechanical/file-content/remove/remove-export-keyword/remove-export-keyword.change-mechanical-file-content.code.ts"

const AT = "akasha/held.module.code.ts"

const TEXT = "export const held = 1\nexport const spare = 2\n"

function bodyOf(text: string, names: readonly string[]): string {
  const said = removeExportKeyword(AT, text, { names })
  expect(said.refused).toBeNull()
  let held = text
  for (const one of said.edits) {
    if (one.kind !== "replace") continue
    held = held.replace(one.contentFrom, one.contentTo)
  }
  return held
}

test("the keyword and the space after it go from the name handed in", () => {
  expect(bodyOf(TEXT, ["spare"])).toBe("export const held = 1\nconst spare = 2\n")
})

test("a statement declaring a name not handed in keeps its keyword", () => {
  expect(bodyOf(TEXT, ["held"])).toBe("const held = 1\nexport const spare = 2\n")
})

test("a function keeps what follows the keyword", () => {
  const text = "export function held(): number {\n  return 1\n}\n"

  expect(bodyOf(text, ["held"])).toBe("function held(): number {\n  return 1\n}\n")
})

test("a statement declaring two names is left where only one is handed in", () => {
  const text = "export const held = 1,\n  spare = 2\n"

  expect(removeExportKeyword(AT, text, { names: ["held"] }).refused).toContain("`held`")
})

test("a name the file declares no statement for is refused", () => {
  expect(removeExportKeyword(AT, TEXT, { names: ["nowhere"] }).refused).toContain("`nowhere`")
})
