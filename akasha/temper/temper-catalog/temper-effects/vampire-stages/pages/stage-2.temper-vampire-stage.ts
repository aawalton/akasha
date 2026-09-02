import type { TemperVampireStage } from "../temper-vampire-stage.page-type.ts"

export const stage2 = {
  id: "01a05fc5-c92d-73c2-96d7-5dd16bdc5a05",
  pageTypeSlug: "temper-vampire-stage",
  slug: "stage-2",
  title: "Stage 2",
  key: "stage-2",
  description:
    "Health Recovery: -30%, Flame Damage Taken: +8%, Regular Ability Costs: +5%, Vampire Ability Costs: -10%",
  displayOrder: 2,
  esoVampireStageId: 135399,
} as const satisfies TemperVampireStage
