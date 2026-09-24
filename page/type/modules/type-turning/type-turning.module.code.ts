import {
  type Facing,
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { importersOf } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"

const HOLDS = "ts"

const PAGE_TYPE = "page-type"

const CHANGE_GENERATOR = "change-generator"

const CODE = "code"

const TYPES = "types"

function generatedReader(facing: Facing, reading: Reading, path: string): boolean {
  for (const one of importersOf(reading, path)) {
    if (generatedIn(facing, one)) return true
  }
  return false
}

function generatedBeside(facing: Facing, path: string): boolean {
  const at = besideAt(path, TYPES, HOLDS)
  return at !== null && generatedIn(facing, at)
}

function readByGenerated(root: string, paths: readonly string[]): boolean {
  const reading = readingIn(root)
  const facing = facingOn(root)
  for (const path of paths) {
    if (generatedBeside(facing, path)) return true
    if (generatedReader(facing, reading, path)) return true
  }
  return false
}

export function turnedBy(change: Change): boolean {
  const pages: string[] = []
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null || said.held !== HOLDS) continue
    if (said.pageType === CHANGE_GENERATOR && said.sections.includes(CODE)) return true
    if (said.sections.includes(TYPES)) return true
    if (said.sections.length > 0) continue
    if (said.pageType === PAGE_TYPE) return true
    pages.push(path)
  }
  return pages.length > 0 && readByGenerated(change.root, pages)
}
