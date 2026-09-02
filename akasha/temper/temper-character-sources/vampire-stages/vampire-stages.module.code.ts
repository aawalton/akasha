import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface VampireStage {
  id: string
  name: string
  stage: number
  esoVampireStageId: number
  description: string
}

const VAMPIRE_STAGE_DATA = {
  "stage-0": {
    id: "stage-0",
    name: "No Vampirism",
    stage: 0,
    esoVampireStageId: 0,
    description: "Not a vampire. No bonuses or penalties.",
  },
  "stage-1": {
    id: "stage-1",
    name: "Stage 1",
    stage: 1,
    esoVampireStageId: 135397,
    description:
      "Health Recovery: -10%, Flame Damage Taken: +5%, Regular Ability Costs: +3%, Vampire Ability Costs: -6%",
  },
  "stage-2": {
    id: "stage-2",
    name: "Stage 2",
    stage: 2,
    esoVampireStageId: 135399,
    description:
      "Health Recovery: -30%, Flame Damage Taken: +8%, Regular Ability Costs: +5%, Vampire Ability Costs: -10%",
  },
  "stage-3": {
    id: "stage-3",
    name: "Stage 3",
    stage: 3,
    esoVampireStageId: 135400,
    description:
      "Health Recovery: -60%, Flame Damage Taken: +13%, Regular Ability Costs: +8%, Vampire Ability Costs: -16%",
  },
  "stage-4": {
    id: "stage-4",
    name: "Stage 4",
    stage: 4,
    esoVampireStageId: 135402,
    description:
      "Health Recovery: -100%, Flame Damage Taken: +20%, Regular Ability Costs: +12%, Vampire Ability Costs: -24%",
  },
} as const satisfies Record<string, VampireStage>

export const vampireStages = createDataFile<VampireStage>()(VAMPIRE_STAGE_DATA)

export type VampireStageId = (typeof vampireStages.ids)[number]
