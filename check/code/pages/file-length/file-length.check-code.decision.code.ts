import {
  CEILING,
  MARKUP_CEILING,
  PROSE_CEILING,
  WHOLE_PROSE_CEILING,
} from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { textNamed } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  extensionsFor,
  heldNamed,
} from "akasha/page/index/modules/extension-carrying/extension-carrying.module.code.ts"
import {
  type Carried,
  foldersFor,
  heldBeside,
  heldUnder,
  namingFor,
  sectionHeld,
  slugsWhere,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { ENTRY_CEILING } from "akasha/page/modules/entry-ceiling/entry-ceiling.module.code.ts"
import { partedIn, sectionedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TEST = "test"

const ENTRIES = "jsonl"

const RECORDS = "json"

const MARKUP = "xml"

const PROSE = "md"

const TEXT = "txt"

const WHOLE_PROSE = "prose"

const RUNS = "runsFileLength"

const TEST_RELIEF =
  "a module carries one test, and what sets it up sits beside it in `test-fixtures`"

const MARKUP_RELIEF =
  "an addon names every XML document the game loads, so divide this one at a top-level element"

const PROSE_RELIEF =
  "nothing joins the parts of a prose file on read, so dividing this one hides all but the first"

const HELD_OFF = new WeakMap<Paged, ReadonlySet<string>>()

export function heldOff(value: Value): boolean {
  return value[RUNS] === false
}

function sectionsOff(paged: Paged): ReadonlySet<string> {
  const found = HELD_OFF.get(paged)
  if (found !== undefined) return found
  const made = slugsWhere(paged.index, heldOff, (named) => paged.index.typesCarrying(named))
  HELD_OFF.set(paged, made)
  return made
}

function sectionOff(path: string, paged: Paged): boolean {
  return sectionHeld(path, sectionsOff(paged))
}

export function exemptIn(path: string, paged: Paged): boolean {
  if (sectionOff(path, paged)) return true
  const carrying = (named: string): Carried => paged.index.carryingOf(named)
  if (heldBeside(path, namingFor(paged.index), heldOff, carrying)) return true
  if (heldUnder(path, foldersFor(paged.index), heldOff, carrying)) return true
  return heldNamed(path, extensionsFor(paged.index), heldOff, carrying)
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

export function reasonsIn(path: string, held: number): readonly string[] {
  const ceiling = ceilingFor(path)
  if (held <= ceiling) return []
  const over = ceiling.toLocaleString("en-US")
  const said = `${held.toLocaleString("en-US")} bytes, over the ${over} byte ceiling`
  const relief = reliefFor(path)
  return relief === null ? [said] : [`${said} — ${relief}`]
}
