import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponPowered = {
  id: "01a05fd7-41cf-7143-abff-539269dc1522",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-powered",
  title: "Weapon Powered",
  key: "weapon:powered",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/powered",
  esoTraitNum: 1,
  displayOrder: 1,
} as const satisfies TemperEsoTraitMap
