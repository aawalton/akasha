import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const ornate = {
  id: "01a05fd8-a461-7734-820f-a98e4b350758",
  pageTypeSlug: "temper-weapon-trait",
  slug: "ornate",
  title: "Ornate",
  key: "ornate",
  effect: "Increases sell price",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_ORNATE",
  displayOrder: 10,
} as const satisfies TemperWeaponTrait
