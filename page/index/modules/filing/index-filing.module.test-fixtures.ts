import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { keepBuilt } from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import { indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { indexEdge } from "akasha/page/index/edge/index-edge.index.ts"
import { indexShapes } from "akasha/page/index/shapes/index-shapes.index.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_PROPERTY = "page-property"

const ID = "id"

type Writing = (path: string, body: string) => void

function filed(root: string, at: string, lines: readonly unknown[], writing: Writing): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  writing(path, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
  keepBuilt(indexIn(root))
}

export function namedFiled(
  root: string,
  id: string,
  propertySlug: string,
  naming: string,
  lines: readonly unknown[]
): undefined {
  filed(root, join(indexEdge.name, PAGE, ID, id, propertySlug, naming), lines, writeFileSync)
}

export function shapeAlsoFiled(
  root: string,
  pageTypeSlug: string,
  lines: readonly unknown[]
): undefined {
  filed(root, join(indexShapes.name, PAGE_PROPERTY, pageTypeSlug), lines, appendFileSync)
}

export function lineFiled(root: string, at: string, line: string): undefined {
  const path = join(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${line}\n`)
  keepBuilt(root)
}
