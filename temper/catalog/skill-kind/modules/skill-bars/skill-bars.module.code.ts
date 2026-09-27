import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { SkillBarId as SkillBarPageSlug } from "akasha/temper/player/character/temper-skill-bar/modules/skill-bar-ids/skill-bar-ids.data-table.code.ts"

export type SkillBarId = SkillBarPageSlug

interface SkillBarTemplate {
  id: SkillBarId
  name: string
}

type SkillBars = DataFile<SkillBarId, SkillBarTemplate>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the skill bars are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class SkillBarsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "SkillBarsUnread"
  }
}

function where(row: Row): string {
  return `the skill bar page \`${String(row.slug)}\``
}

function placeOf(row: Row): number {
  if (typeof row.displayOrder !== "number") throw new Error(`${where(row)} states no display order`)
  return row.displayOrder
}

function barOf(row: Row): SkillBarTemplate {
  if (typeof row.title !== "string") throw new Error(`${where(row)} states no title`)
  return { id: String(row.slug) as SkillBarId, name: row.title }
}

export function skillBarsOf(pages: Iterable<Row>): SkillBars {
  const bars = [...pages].sort((one, two) => placeOf(one) - placeOf(two)).map(barOf)
  const data = Object.fromEntries(bars.map((bar) => [bar.id, bar])) as Record<
    SkillBarId,
    SkillBarTemplate
  >
  return createDataFile<SkillBarTemplate>()(data)
}

let held: SkillBars | null = null

export function holdSkillBars(read: SkillBars): SkillBars {
  held = read
  return read
}

export function skillBars(): SkillBars {
  if (held === null) throw new SkillBarsUnread()
  return held
}
