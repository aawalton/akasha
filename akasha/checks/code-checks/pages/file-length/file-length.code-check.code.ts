import { namedIn } from "@akasha/pages-system/page-file-name"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"

export const CEILING = 15000

export const ENTRY_CEILING = 8 * 1024 * 1024

export const MARKUP_CEILING = 128 * 1024

const TEST = "test"

const TS = "ts"

const ENTRIES = "jsonl"

const MARKUP = "xml"

const TEST_RELIEF =
  "a module carries one test, and what sets it up stands beside it in `test-fixtures`"

const MARKUP_RELIEF =
  "an addon names every XML document the game loads, so divide this one at a top-level element"

function ceilingFor(path: string): number {
  const held = namedIn(path)?.held
  if (held === ENTRIES) return ENTRY_CEILING
  if (held === MARKUP) return MARKUP_CEILING
  return CEILING
}

function reliefFor(path: string): string | null {
  const said = namedIn(path)
  if (said === null) return null
  if (said.held === MARKUP) return MARKUP_RELIEF
  return said.tail === TEST && said.held === TS ? TEST_RELIEF : null
}

export function reasonsIn(given: Body): readonly string[] {
  const held = given.bytes.byteLength
  const ceiling = ceilingFor(given.path)
  if (held <= ceiling) return []
  const over = ceiling.toLocaleString("en-US")
  const said = `${held.toLocaleString("en-US")} bytes, over the ${over} byte ceiling`
  const relief = reliefFor(given.path)
  return relief === null ? [said] : [`${said} — ${relief}`]
}

export const fileLength = judgingEach(FILES, reasonsIn)
