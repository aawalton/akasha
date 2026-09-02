import type { TemperVampireStage } from "../temper-vampire-stage.page-type.ts"

export const noVampirism = {
  id: "01a05fc5-c92d-7fd4-a6ec-4d969d450fed",
  pageTypeSlug: "temper-vampire-stage",
  slug: "no-vampirism",
  title: "No Vampirism",
  key: "stage-0",
  description: "Not a vampire. No bonuses or penalties.",
  displayOrder: 0,
  esoVampireStageId: 0,
} as const satisfies TemperVampireStage
