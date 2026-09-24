"use client"

import { panelBy } from "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { PlayedChannel } from "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"

export const Panel = panelBy(PlayedChannel, ({ run }) => run)
