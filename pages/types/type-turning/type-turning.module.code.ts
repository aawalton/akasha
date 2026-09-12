import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  type Facing,
  facingOn,
  generatedIn,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import { importersIn, readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"

const HOLDS = "ts"

const PAGE_TYPE = "page-type"

const GENERATOR = "type-generator"

const TYPES = "types"

function generatedReader(facing: Facing, reading: Reading, path: string): boolean {
  for (const one of importersIn(reading, path)) {
    if (generatedIn(facing, one)) return true
  }
  return false
}

function readByGenerated(root: string, paths: readonly string[]): boolean {
  const reading = readingIn(root)
  const facing = facingOn(reading)
  for (const path of paths) {
    if (generatedReader(facing, reading, path)) return true
  }
  return false
}

export function turnedBy(change: Change): boolean {
  const pages: string[] = []
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null || said.held !== HOLDS) continue
    if (said.sections.includes(GENERATOR)) return true
    if (said.sections.includes(TYPES)) return true
    if (said.sections.length > 0) continue
    if (said.pageType === PAGE_TYPE) return true
    pages.push(path)
  }
  return pages.length > 0 && readByGenerated(change.root, pages)
}
