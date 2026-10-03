"use client"

import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import { PlayerCharacterPanel } from "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
import { QuestsPanel } from "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"
import { SceneCoverPanel } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import { statsShownIn } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"

import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"
import { TimePanel } from "akasha/story/ui/modules/time-panel/time-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
import {
  metricLabel,
  poolPanelBy,
} from "akasha/story/ui/played-panel/modules/pool-panel/pool-panel.module.code.tsx"
import { OtherwhereMapPanel } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/modules/otherwhere-the-library-map/otherwhere-the-library-map.module.code.tsx"
import { TOWER_WORKINGS } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts"
import { towerAttributePoint } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-attribute-point/tower-attribute-point.page-type.ts"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import { towerStamina } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-stamina/tower-stamina.page-type.ts"

const OFFERING = "akashaDrawing"

const OFFERED: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx": { panelBy },
  "akasha/story/ui/played-panel/modules/pool-panel/pool-panel.module.code.tsx": {
    metricLabel,
    poolPanelBy,
  },
  "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx": { HudPanel },

  "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx": {
    PlayerCharacterPanel,
  },
  "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx": { QuestsPanel },
  "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx": {
    SceneCoverPanel,
  },
  "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx": { statsShownIn },

  "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx": { StorySoFar },
  "akasha/story/ui/modules/time-panel/time-panel.module.code.tsx": { TimePanel },
  "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/modules/otherwhere-the-library-map/otherwhere-the-library-map.module.code.tsx":
    { OtherwhereMapPanel },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts":
    { TOWER_WORKINGS },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-attribute-point/tower-attribute-point.page-type.ts":
    { towerAttributePoint },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts":
    { towerHealth },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts":
    { towerMana },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-stamina/tower-stamina.page-type.ts":
    { towerStamina },
}

function strictly(offered: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> {
  return new Proxy(offered, {
    get(held, name, asker) {
      if (typeof name === "string" && !Object.hasOwn(held, name)) {
        throw new ReferenceError(`${name} is not offered to a panel`)
      }
      return Reflect.get(held, name, asker)
    },
  })
}

const STRICT = Object.fromEntries(
  Object.entries(OFFERED).map(([path, offered]) => [path, strictly(offered)])
)

export function offerDrawing(): undefined {
  Object.assign(globalThis, { [OFFERING]: STRICT })
}
