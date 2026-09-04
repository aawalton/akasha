import { basename } from "node:path"
import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import { partedIn, sectionedIn } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  FILES,
  judgingEach,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"

export const CEILING = 15000

export const MARKUP_CEILING = 128 * 1024

export const PROSE_CEILING = 128 * 1024

export const WHOLE_PROSE_CEILING = 512 * 1024

const TEST = "test"

const ENTRIES = "jsonl"

const RECORDS = "json"

const MARKUP = "xml"

const PROSE = "md"

const TEXT = "txt"

const WHOLE_PROSE = "prose"

const NAMED_FILE_PROPERTY = "named-file-property"

const RUNS = "runsFileLength"

const FILE_NAME = "fileName"

const TEST_RELIEF =
  "a module carries one test, and what sets it up stands beside it in `test-fixtures`"

const MARKUP_RELIEF =
  "an addon names every XML document the game loads, so divide this one at a top-level element"

const PROSE_RELIEF =
  "nothing joins the parts of a prose file on read, so dividing this one hides all but the first"

const EXEMPT = new WeakMap<Shadow, ReadonlySet<string>>()

export function exemptNamesFrom(values: Iterable<Value | null>): ReadonlySet<string> {
  const made = new Set<string>()
  for (const value of values) {
    if (value === null || value[RUNS] !== false) continue
    const named = value[FILE_NAME]
    if (typeof named === "string" && named !== "") made.add(named)
  }
  return made
}

function exemptNamesIn(shadow: Shadow): ReadonlySet<string> {
  const found = EXEMPT.get(shadow)
  if (found !== undefined) return found
  const made = exemptNamesFrom(
    shadow.index.everyOfType(NAMED_FILE_PROPERTY).map((listed) => shadow.pageOf(listed.path))
  )
  EXEMPT.set(shadow, made)
  return made
}

function exemptIn(given: Body, shadow: Shadow): boolean {
  return exemptNamesIn(shadow).has(basename(given.path))
}

function ceilingFor(path: string): number {
  const said = partedIn(path)
  if (said === null) return CEILING
  const held = said.held
  if (held === ENTRIES || held === RECORDS) return ENTRY_CEILING
  if (held === MARKUP) return MARKUP_CEILING
  if (held === PROSE || held === TEXT) {
    return sectionedIn(said)?.propertySlug === WHOLE_PROSE ? WHOLE_PROSE_CEILING : PROSE_CEILING
  }
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

export const fileLength = judgingEach(FILES, (given, shadow) =>
  exemptIn(given, shadow) ? [] : reasonsIn(given)
)
