import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const aravelHud = {
  id: "01a0c4a4-5834-7907-82c5-543383c1b0ba",
  type: "page-type/played-panel",
  slug: "aravel-hud",
  definition: "Aravel's three pools, read off what the traveller has left",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 42,
} as const satisfies PlayedPanel
