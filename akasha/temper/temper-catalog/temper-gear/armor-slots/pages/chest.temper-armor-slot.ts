import type { TemperArmorSlot } from "../temper-armor-slot.page-type.ts"

export const chest = {
  id: "01a05fd4-d96c-7a66-b933-92bd5b7622c8",
  pageTypeSlug: "temper-armor-slot",
  slug: "chest",
  title: "Chest",
  key: "chest",
  icon: "/resources/gearslot_chest.png",
  displayOrder: 2,
} as const satisfies TemperArmorSlot
