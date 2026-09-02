import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const subclassingSkillMorphsPanelCard = {
  id: "01a06270-883d-7001-a3e2-19a44697e51c",
  pageTypeSlug: "module",
  slug: "subclassing-skill-morphs-panel-card",
  definition: "how far an account has taken the morphs of the skills subclassing lends out",
  code: "tsx",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A class line no morph was measured for is left out.",
    },
  ],
} as const satisfies Module
