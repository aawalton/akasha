import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const beetleScuttle = {
  id: "01a05fd8-a44f-7fd2-aed2-8bcc16403532",
  pageTypeSlug: "temper-reagent",
  slug: "beetle-scuttle",
  title: "Beetle Scuttle",
  key: "beetle-scuttle",
  icon: "resources/reagent_scuttle.png",
  itemId: 77583,
  alchemyEffects: ["breach", "increase-armor", "protection", "vitality"],
} as const satisfies TemperReagent
