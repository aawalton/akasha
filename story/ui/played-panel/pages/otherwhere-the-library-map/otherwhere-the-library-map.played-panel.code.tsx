"use client"

import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { OtherwhereMapPanel } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/modules/otherwhere-the-library-map/otherwhere-the-library-map.module.code.tsx"

export const Panel = panelBy(OtherwhereMapPanel, ({ run }) => ({ player: run.player }))
