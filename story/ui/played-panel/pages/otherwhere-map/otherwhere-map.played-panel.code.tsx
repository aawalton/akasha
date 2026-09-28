"use client"

import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { OtherwhereMapPanel } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/modules/otherwhere-map/otherwhere-map.module.code.tsx"

export const Panel = panelBy(OtherwhereMapPanel, ({ run }) => ({ player: run.player }))
