import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillMorphsProgressPanelCard = {
  id: "01a06270-883d-7000-98b7-a23674b65603",
  pageTypeSlug: "module",
  slug: "skill-morphs-progress-panel-card",
  definition: "how far each chosen character has taken every skill a morph is picked for",
  code: "tsx",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Choosing no character reckons every character together.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill line with no morphable skill is left out.",
    },
  ],
} as const satisfies Module
