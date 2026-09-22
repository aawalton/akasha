import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponInfused = {
  id: "01a05fd7-41ce-7ce1-9a53-5473cd6f35f6",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-infused",
  title: "Weapon Infused",
  key: "weapon:infused",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/infused",
  esoTraitNum: 4,
  displayOrder: 4,
} as const satisfies TemperEsoTraitMap
