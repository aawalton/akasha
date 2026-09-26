import type { Working } from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"
import { worked as healthMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.world-derived-metric.formula.code.ts"
import { towerHealthMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.world-derived-metric.ts"
import { worked as initiative } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-initiative.world-derived-metric.formula.code.ts"
import { towerInitiative } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-initiative.world-derived-metric.ts"
import { worked as leveling } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-leveling.world-derived-metric.formula.code.ts"
import { towerLeveling } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-leveling.world-derived-metric.ts"
import { worked as manaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mana-max.world-derived-metric.formula.code.ts"
import { towerManaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mana-max.world-derived-metric.ts"
import { worked as mentalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-attack.world-derived-metric.formula.code.ts"
import { towerMentalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-attack.world-derived-metric.ts"
import { worked as mentalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-defence.world-derived-metric.formula.code.ts"
import { towerMentalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-defence.world-derived-metric.ts"
import { worked as physicalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.world-derived-metric.formula.code.ts"
import { towerPhysicalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.world-derived-metric.ts"
import { worked as physicalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-defence.world-derived-metric.formula.code.ts"
import { towerPhysicalDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-defence.world-derived-metric.ts"
import { worked as staminaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-stamina-max.world-derived-metric.formula.code.ts"
import { towerStaminaMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-stamina-max.world-derived-metric.ts"

export const TOWER_WORKINGS: readonly Working[] = [
  { title: towerHealthMax.title, worked: healthMax },
  { title: towerManaMax.title, worked: manaMax },
  { title: towerStaminaMax.title, worked: staminaMax },
  { title: towerInitiative.title, worked: initiative },
  { title: towerPhysicalAttack.title, worked: physicalAttack },
  { title: towerPhysicalDefence.title, worked: physicalDefence },
  { title: towerMentalAttack.title, worked: mentalAttack },
  { title: towerMentalDefence.title, worked: mentalDefence },
  { title: towerLeveling.title, worked: leveling },
]
