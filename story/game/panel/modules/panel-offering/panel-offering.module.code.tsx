"use client"

import { panelBy } from "akasha/story/game/panel/modules/panel-showing/panel-showing.module.code.tsx"
import { poolPanelBy } from "akasha/story/game/panel/modules/pool-panel/pool-panel.module.code.tsx"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import { QuestsPanel } from "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"

const OFFERING = "akashaDrawing"

const OFFERED: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  "akasha/story/game/panel/modules/panel-showing/panel-showing.module.code.tsx": { panelBy },
  "akasha/story/game/panel/modules/pool-panel/pool-panel.module.code.tsx": { poolPanelBy },
  "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx": { HudPanel },
  "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx": { QuestsPanel },
  "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx": { SheetPanel },
  "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx": { StorySoFar },
}

export function offerDrawing(): undefined {
  Object.assign(globalThis, { [OFFERING]: OFFERED })
}
