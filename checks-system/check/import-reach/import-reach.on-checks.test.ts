import { describe, expect, test } from "bun:test"
import { declaresOnly, importReach } from "./import-reach.ts"
import type { File } from "../check-shape.ts"

const ROOT = "/repos/akasha"
const AT = `${ROOT}/readouts/one.ts`

const run = importReach.run as (given: File) => readonly string[]

function ran(text: string, path = AT): readonly string[] {
  return run({ root: ROOT, path, body: Buffer.from(text) })
}

describe("declaresOnly names a type declaration and nothing else", () => {
  test("a declaration is one", () => {
    expect(declaresOnly("../../code-editor/src/vscode-dts/vscode.d.ts")).toBe(true)
  })

  test("a module whose name merely ends in .ts is not", () => {
    expect(declaresOnly("../../code/thing.ts")).toBe(false)
  })

  test("a name carrying `d.ts` in the middle is not", () => {
    expect(declaresOnly("../../code/d.ts.ts")).toBe(false)
  })
})

describe("import reach fails what leaves the repository", () => {
  test("an import inside the repository passes", () => {
    expect(ran(`import { x } from "../day/reset-times.ts"`)).toEqual([])
  })

  test("an import reaching another repository fails, naming what it reached", () => {
    const said = ran(`import { x } from "../../code/packages/shared/thing.ts"`)
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("outside this repository")
  })

  test("a file carrying no code is not judged", () => {
    expect(ran(`import { x } from "../../code/thing.ts"`, `${ROOT}/readouts/one.md`)).toEqual([])
  })
})

describe("a type declaration may be reached in another repository", () => {
  test("a declaration outside the repository passes", () => {
    expect(ran(`import type { X } from "../../code-editor/src/vscode-dts/vscode.d.ts"`)).toEqual([])
  })

  test("a triple-slash reference to a declaration outside passes", () => {
    expect(ran(`/// <reference path="../../code-editor/src/vscode-dts/vscode.d.ts" />`)).toEqual([])
  })

  test("a declaration inside the repository passes, as it always did", () => {
    expect(ran(`import type { X } from "../page/document/types.d.ts"`)).toEqual([])
  })

  test("the exemption does not admit a module beside the declaration", () => {
    const said = ran(
      `import type { X } from "../../code-editor/src/vscode.d.ts"\n` +
        `import { y } from "../../code-editor/src/other.ts"`
    )
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("other.ts")
  })
})
