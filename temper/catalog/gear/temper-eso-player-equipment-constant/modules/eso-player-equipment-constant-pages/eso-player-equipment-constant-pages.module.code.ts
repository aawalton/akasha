type Row = Readonly<Record<string, unknown>>

class PlayerEquipmentConstantsUnread extends Error {
  constructor() {
    super("the player equipment constants are read from pages, and nothing has read them yet")
  }
}

let held: ReadonlyMap<string, ReadonlyMap<string, number>> | null = null

export function holdPlayerEquipmentConstants(pages: Iterable<Row>): undefined {
  const families = new Map<string, Map<string, number>>()
  for (const row of pages) {
    const { constantFamily, constantId, esoNum } = row
    if (typeof constantFamily !== "string" || typeof constantId !== "string") continue
    if (typeof esoNum !== "number") continue
    const family = families.get(constantFamily) ?? new Map<string, number>()
    family.set(constantId, esoNum)
    families.set(constantFamily, family)
  }
  held = families
  return undefined
}

export function playerEsoNumOf(family: string, constantId: string): number | undefined {
  if (held === null) throw new PlayerEquipmentConstantsUnread()
  return held.get(family)?.get(constantId)
}
