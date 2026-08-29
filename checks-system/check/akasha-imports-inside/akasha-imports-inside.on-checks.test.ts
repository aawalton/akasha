import { expect, test } from "bun:test"
import { relative, resolve } from "node:path"
import type { Tree } from "../check-shape.ts"
import akashaImportsInside from "./akasha-imports-inside.check.code.attachment.ts"

const ROOT = resolve(import.meta.dir, "../../..")

function treeOf(held: Readonly<Record<string, string>>): Tree {
  return {
    root: ROOT,
    at: (path) => {
      const body = held[relative(ROOT, path)]
      return body === undefined ? null : Buffer.from(body)
    },
    paths: () => Object.keys(held).map((one) => `${ROOT}/${one}`),
    gone: () => [],
    goneElsewhere: () => [],
    repointedElsewhere: () => new Map(),
    dir: () => ROOT,
  }
}

function verdict(path: string, text: string, alsoTracked: readonly string[] = []): readonly string[] {
  const held: Record<string, string> = { [path]: text }
  for (const one of alsoTracked) held[one] = ""
  return akashaImportsInside
    .run({ root: ROOT, paths: [`${ROOT}/${path}`], tree: treeOf(held), keep: () => ROOT })
    .map((one) => one.reason)
}

const OUTSIDE = "checks-system/checks.ts"

const ALSO = "patches/patch.ts"

const PACKAGE = "shared/pages-query/src/index.ts"

const HERE = "akasha/write-system/thing.ts"

test("a file under akasha importing a sibling inside passes", () => {
  expect(verdict(HERE, `import { x } from "./other.ts"`, ["akasha/write-system/other.ts"])).toEqual([])
})

test("a file under akasha reaching up into another akasha system passes", () => {
  const target = "akasha/domain-system/domain/domain.page-type.ts"
  expect(
    verdict(HERE, `import type { D } from "../domain-system/domain/domain.page-type.ts"`, [target])
  ).toEqual([])
})

test("a file under akasha importing a tracked file outside the folder fails", () => {
  expect(verdict(HERE, `import { x } from "../../checks-system/checks.ts"`, [OUTSIDE])).toHaveLength(1)
})

test("a file outside the folder that nothing tracks is not judged", () => {
  expect(verdict(HERE, `import { x } from "../../dist/built.js"`)).toEqual([])
})

test("a file outside akasha is not judged, wherever it imports from", () => {
  const target = "akasha/write-system/corpus.module.code.ts"
  expect(
    verdict("checks-system/thing.ts", `import { x } from "../akasha/write-system/corpus.module.code.ts"`, [target])
  ).toEqual([])
})

test("a folder whose name only starts with akasha is outside the akasha folder", () => {
  expect(verdict("akasha-notes/thing.ts", `import { x } from "../checks-system/checks.ts"`, [OUTSIDE])).toEqual([])
})

test("a runtime builtin is not judged", () => {
  expect(verdict(HERE, `import { readFileSync } from "node:fs"`)).toEqual([])
})

test("a package resolving under node_modules is not judged, nothing tracking it", () => {
  expect(verdict(HERE, `import ts from "typescript"`)).toEqual([])
})

test("a workspace package naming a tracked file outside akasha fails, though it is written bare", () => {
  expect(verdict(HERE, `import { x } from "@shared/pages-query"`, [PACKAGE])).toHaveLength(1)
})

test("a type-only import is judged as a value import is", () => {
  expect(verdict(HERE, `import type { X } from "../../checks-system/checks.ts"`, [OUTSIDE])).toHaveLength(1)
})

test("a dynamic import out of the folder fails", () => {
  expect(verdict(HERE, `await import("../../checks-system/checks.ts")`, [OUTSIDE])).toHaveLength(1)
})

test("a require out of the folder fails", () => {
  expect(verdict(HERE, `const x = require("../../checks-system/checks.ts")`, [OUTSIDE])).toHaveLength(1)
})

test("every specifier reaching out is named, not just the first", () => {
  const text = `import "../../checks-system/checks.ts"\nimport "../../patches/patch.ts"\n`
  expect(verdict(HERE, text, [OUTSIDE, ALSO])).toHaveLength(2)
})

test("a file that carries no code is not judged", () => {
  expect(verdict("akasha/write-system/notes.md", `import { x } from "../../checks-system/checks.ts"`, [OUTSIDE])).toEqual(
    []
  )
})
