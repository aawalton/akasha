import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponOrnate = {
  id: "01a05fd7-41cf-78af-a9d2-54687a3e06ee",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-ornate",
  title: "Weapon Ornate",
  key: "weapon:ornate",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/ornate",
  esoTraitNum: 10,
  displayOrder: 10,
} as const satisfies TemperEsoTraitMap
