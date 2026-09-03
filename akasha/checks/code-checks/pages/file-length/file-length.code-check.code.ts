import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import { partedIn } from "@akasha/pages-system/page-file-name"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  FILES,
  judgingEach,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"

export const CEILING = 15000

export { ENTRY_CEILING }

export const MARKUP_CEILING = 128 * 1024

export const PROSE_CEILING = 128 * 1024

const TEST = "test"

const ENTRIES = "jsonl"

const RECORDS = "json"

const MARKUP = "xml"

const PROSE = "md"

const TEXT = "txt"

const TEST_RELIEF =
  "a module carries one test, and what sets it up stands beside it in `test-fixtures`"

const MARKUP_RELIEF =
  "an addon names every XML document the game loads, so divide this one at a top-level element"

const PROSE_RELIEF =
  "nothing joins the parts of a prose file on read, so dividing this one hides all but the first"

function ceilingFor(path: string): number {
  const held = partedIn(path)?.held
  if (held === ENTRIES || held === RECORDS) return ENTRY_CEILING
  if (held === MARKUP) return MARKUP_CEILING
  if (held === PROSE || held === TEXT) return PROSE_CEILING
  return CEILING
}

function reliefFor(path: string): string | null {
  const said = partedIn(path)
  if (said === null) return null
  if (said.held === MARKUP) return MARKUP_RELIEF
  if (said.held === PROSE || said.held === TEXT) return PROSE_RELIEF
  if (said.sections.length !== 1 || said.sections[0] !== TEST) return null
  return textNamed(path) ? TEST_RELIEF : null
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
