import type { TemperVampireStage } from "../temper-vampire-stage.page-type.ts"

export const stage3 = {
  id: "01a05fc5-c92e-7351-8ead-981a342f385e",
  pageTypeSlug: "temper-vampire-stage",
  slug: "stage-3",
  title: "Stage 3",
  key: "stage-3",
  description:
    "Health Recovery: -60%, Flame Damage Taken: +13%, Regular Ability Costs: +8%, Vampire Ability Costs: -16%",
  displayOrder: 3,
  esoVampireStageId: 135400,
} as const satisfies TemperVampireStage
