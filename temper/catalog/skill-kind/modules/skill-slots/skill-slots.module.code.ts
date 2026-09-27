import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { SkillSlotId as SkillSlotPageSlug } from "akasha/temper/catalog/skill/slot/modules/skill-slot-ids/skill-slot-ids.data-table.code.ts"

export type SkillSlotId = SkillSlotPageSlug

interface SkillSlotTemplate {
  id: SkillSlotId
  name: string
}

type SkillSlots = DataFile<SkillSlotId, SkillSlotTemplate>

type Row = Readonly<Record<string, unknown>>

const ULTIMATE: SkillSlotId = "ultimate"

const UNREAD =
  "the skill slots are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class SkillSlotsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "SkillSlotsUnread"
  }
}

function slotIn(row: Row): readonly [number, SkillSlotTemplate] {
  const at = `the skill slot page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  return [row.hashPlace, { id: String(row.slug) as SkillSlotId, name: row.title }]
}

export function skillSlotsOf(pages: Iterable<Row>): SkillSlots {
  const slots = [...pages]
    .map(slotIn)
    .sort(([one], [two]) => one - two)
    .map(([, slot]) => slot)
  const data = Object.fromEntries(slots.map((slot) => [slot.id, slot])) as Record<
    SkillSlotId,
    SkillSlotTemplate
  >
  return createDataFile<SkillSlotTemplate>()(data)
}

let held: SkillSlots | null = null

export function holdSkillSlots(read: SkillSlots): SkillSlots {
  held = read
  return read
}

export function skillSlots(): SkillSlots {
  if (held === null) throw new SkillSlotsUnread()
  return held
}

export function activeSkillSlots(): readonly SkillSlotTemplate[] {
  return skillSlots().list.filter((slot) => slot.id !== ULTIMATE)
}
