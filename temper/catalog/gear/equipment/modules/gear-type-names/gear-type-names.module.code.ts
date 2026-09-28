type Row = Readonly<Record<string, unknown>>

type GearTypeNames = {
  readonly equipTypes: ReadonlyMap<number, string>
  readonly weaponTypes: ReadonlyMap<number, string>
  readonly armorTypes: ReadonlyMap<number, string>
}

type GearTypeRows = {
  readonly equipTypes: Iterable<Row>
  readonly weaponTypes: Iterable<Row>
  readonly armorWeights: Iterable<Row>
}

class GearTypeNamesUnread extends Error {
  constructor() {
    super(
      "the gear type names are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"
    )
    this.name = "GearTypeNamesUnread"
  }
}

function titlesBy(field: string, ...pages: readonly Iterable<Row>[]): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  for (const rows of pages) {
    for (const row of rows) {
      const number = row[field]
      if (typeof number !== "number" || typeof row.title !== "string") continue
      if (found.has(number)) {
        throw new Error(`two gear pages state ${field} ${number}, so neither names it`)
      }
      found.set(number, row.title)
    }
  }
  return found
}

export function gearTypeNamesOf(rows: GearTypeRows): GearTypeNames {
  return {
    equipTypes: titlesBy("equipType", rows.equipTypes),
    weaponTypes: titlesBy("esoWeaponTypeNumber", rows.weaponTypes, rows.armorWeights),
    armorTypes: titlesBy("armorType", rows.armorWeights),
  }
}

let held: GearTypeNames | null = null

export function holdGearTypeNames(names: GearTypeNames): undefined {
  held = names
}

export function gearTypeNames(): GearTypeNames {
  if (held === null) throw new GearTypeNamesUnread()
  return held
}
