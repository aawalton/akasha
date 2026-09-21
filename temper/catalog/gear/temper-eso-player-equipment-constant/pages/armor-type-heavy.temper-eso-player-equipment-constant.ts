import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.types.ts"

export const armorTypeHeavy = {
  id: "01a05fd7-41bd-7697-94f5-76911d62211c",
  type: "page-type/temper-eso-player-equipment-constant",
  slug: "armor-type-heavy",
  title: "Armor Type Heavy",
  key: "armor-type:heavy",
  constantFamily: "armor-type",
  constantId: "heavy",
  esoNum: 3,
  displayOrder: 3,
} as const satisfies TemperEsoPlayerEquipmentConstant
