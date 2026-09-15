import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import type { Body } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const MODULE = "module"

const CODE = "code"

const TS = "ts"

const SEEDED: readonly string[] = ["landing", "graph-asking", "page-value-reading"]

export type Timed = {
  readonly name: string
  readonly reached: number
  readonly milliseconds: number
}

export function linesFor(held: readonly Timed[]): readonly string[] {
  return held.map((one) => `${one.name}\t${one.reached} files\t${one.milliseconds}ms`)
}

export function codeIn(from: string, slug: string): string {
  const page = listedAt(from, MODULE, slug)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${slug}\`, so no closure would be seeded`)
  }
  return at
}

function bodiesUnder(root: string): Body {
  return (path) => {
    const at = join(root, path)
    const found = statSync(at, { throwIfNoEntry: false })
    return found?.isFile() === true ? readFileSync(at, "utf8") : null
  }
}

function timedOver(name: string, answering: () => readonly string[]): Timed {
  const began = Date.now()
  const found = answering()
  return { name, reached: found.length, milliseconds: Date.now() - began }
}

export function measured(from: string): readonly string[] {
  const bodyAt = bodiesUnder(from)
  const held: Timed[] = []
  for (const slug of SEEDED) {
    const seed = codeIn(from, slug)
    held.push(
      timedOver(`out ${slug}`, () =>
        closureOf(imports, [seed], { index: shadowAt(from).index, bodyAt })
      )
    )
    held.push(
      timedOver(`in ${slug}`, () => closureOf(importers, [seed], { index: shadowAt(from).index }))
    )
  }
  return linesFor(held)
}
