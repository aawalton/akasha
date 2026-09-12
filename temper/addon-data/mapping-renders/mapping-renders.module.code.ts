import { generateChampionPointMappings } from "akasha/temper/addon-data/champion-point-mappings/champion-point-mappings.module.code.ts"
import { generateClassMappings } from "akasha/temper/addon-data/class-mappings/class-mappings.module.code.ts"
import { generateCurseMappings } from "akasha/temper/addon-data/curse-mappings/curse-mappings.module.code.ts"
import { generateFoodMappings } from "akasha/temper/addon-data/food-mappings/food-mappings.module.code.ts"
import { generateAllianceMappings } from "akasha/temper/addon-data/modules/alliance-mappings/alliance-mappings.module.code.ts"
import { generateMundusMappings } from "akasha/temper/addon-data/mundus-mappings/mundus-mappings.module.code.ts"
import { generatePassiveSkillMappings } from "akasha/temper/addon-data/passive-skill-mappings/passive-skill-mappings.module.code.ts"
import { generatePlayerSkillMappings } from "akasha/temper/addon-data/player-skill-mappings/player-skill-mappings.module.code.ts"
import { generatePotionMappings } from "akasha/temper/addon-data/potion-mappings/potion-mappings.module.code.ts"
import { generateRaceMappings } from "akasha/temper/addon-data/race-mappings/race-mappings.module.code.ts"
import { generatePlayerEquipmentMappings } from "akasha/temper/addon-data/render-equipment-mappings/render-equipment-mappings.module.code.ts"
import { generateScribingMappings } from "akasha/temper/addon-data/scribing-mappings/scribing-mappings.module.code.ts"
import { generateSetMappings } from "akasha/temper/addon-data/set-mappings/set-mappings.module.code.ts"

export type MappingRender = {
  readonly rendered: string
  readonly render: () => string
}

export const MAPPING_RENDERS: readonly MappingRender[] = [
  { rendered: "alliance-mappings.generated.ts", render: generateAllianceMappings },
  { rendered: "character-class-mappings.generated.ts", render: generateClassMappings },
  { rendered: "character-race-mappings.generated.ts", render: generateRaceMappings },
  { rendered: "champion-point-mappings.generated.ts", render: generateChampionPointMappings },
  { rendered: "player-skill-mappings.generated.ts", render: generatePlayerSkillMappings },
  { rendered: "mundus-mappings.generated.ts", render: generateMundusMappings },
  { rendered: "curse-mappings.generated.ts", render: generateCurseMappings },
  { rendered: "food-mappings.generated.ts", render: generateFoodMappings },
  { rendered: "potion-mappings.generated.ts", render: generatePotionMappings },
  { rendered: "player-equipment-mappings.generated.ts", render: generatePlayerEquipmentMappings },
  { rendered: "set-mappings.generated.ts", render: generateSetMappings },
  { rendered: "scribing-mappings.generated.ts", render: generateScribingMappings },
  { rendered: "passive-skill-mappings.generated.ts", render: generatePassiveSkillMappings },
]
