import type { Working } from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"
import { worked as healthMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-health-max.world-derived-metric.formula.code.ts"
import { haremHotelHealthMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-health-max.world-derived-metric.ts"
import { worked as initiative } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-initiative.world-derived-metric.formula.code.ts"
import { haremHotelInitiative } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-initiative.world-derived-metric.ts"
import { worked as leveling } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-leveling.world-derived-metric.formula.code.ts"
import { haremHotelLeveling } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-leveling.world-derived-metric.ts"
import { worked as manaMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mana-max.world-derived-metric.formula.code.ts"
import { haremHotelManaMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mana-max.world-derived-metric.ts"
import { worked as mentalAttack } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mental-attack.world-derived-metric.formula.code.ts"
import { haremHotelMentalAttack } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mental-attack.world-derived-metric.ts"
import { worked as mentalDefence } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mental-defence.world-derived-metric.formula.code.ts"
import { haremHotelMentalDefence } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mental-defence.world-derived-metric.ts"
import { worked as physicalAttack } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-physical-attack.world-derived-metric.formula.code.ts"
import { haremHotelPhysicalAttack } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-physical-attack.world-derived-metric.ts"
import { worked as physicalDefence } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-physical-defence.world-derived-metric.formula.code.ts"
import { haremHotelPhysicalDefence } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-physical-defence.world-derived-metric.ts"
import { worked as staminaMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-stamina-max.world-derived-metric.formula.code.ts"
import { haremHotelStaminaMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-stamina-max.world-derived-metric.ts"

export const HAREM_HOTEL_WORKINGS: readonly Working[] = [
  { title: haremHotelHealthMax.title, worked: healthMax },
  { title: haremHotelManaMax.title, worked: manaMax },
  { title: haremHotelStaminaMax.title, worked: staminaMax },
  { title: haremHotelInitiative.title, worked: initiative },
  { title: haremHotelPhysicalAttack.title, worked: physicalAttack },
  { title: haremHotelPhysicalDefence.title, worked: physicalDefence },
  { title: haremHotelMentalAttack.title, worked: mentalAttack },
  { title: haremHotelMentalDefence.title, worked: mentalDefence },
  { title: haremHotelLeveling.title, worked: leveling },
]
