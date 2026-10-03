import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const otherCharacters = {
  id: "01a0e81f-b53a-7ac1-a0c7-8ad8ee82a3aa",
  type: "page-type/played-panel",
  slug: "other-characters",
  definition: "an empty panel, the other characters being drawn in the player character's panel",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 20,
  decisions: [
    { decisionKind: "decision-kind/stopgap", statement: "A story may still name this panel." },
  ],
} as const satisfies PlayedPanel
