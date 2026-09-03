import type { TemperVampireStage } from "../temper-vampire-stage.page-type.ts"

export const noVampirism = {
  id: "019e21f4-0aa7-7693-b46b-74dc46126f3a",
  pageTypeSlug: "temper-vampire-stage",
  slug: "no-vampirism",
  title: "No Vampirism",
  key: "stage-0",
  description: "Not a vampire. No bonuses or penalties.",
  displayOrder: 0,
  esoVampireStageId: 0,
} as const satisfies TemperVampireStage
