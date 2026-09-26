import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const personaCover = {
  id: "01a0de7f-617b-77b3-9594-4832f61e2915",
  type: "page-type/played-panel",
  slug: "persona-cover",
  definition: "the cover of each persona the play is with now",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies PlayedPanel
