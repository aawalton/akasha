import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSkillMorphs = {
  id: "01a061c7-0738-7e24-b2fa-36e9b8781b9c",
  pageTypeSlug: "workspace-package",
  slug: "temper-skill-morphs",
  definition: "a character's progress through the skills that morph",
  manifest: "json",
  partSlugs: [
    "module/morph-progress-types",
    "module/applicable-eso-skill-lines",
    "module/morphable-skills",
    "module/morph-pair",
    "module/morph-conflict",
    "module/skill-organization",
    "module/character-morph-progress-eso",
    "module/character-morph-progress",
    "module/skill-line-morph-totals",
    "module/skill-morph-progress-paths",
    "module/subclassing-morph-progress",
    "module/build-morph-entry",
    "module/select-morph-suggestions",
    "module/morph-suggestion-fixtures",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill morphs only where the game gives it a first and a second morph.",
    },
    {
      invariantKind: "departure",
      statement: "A skill variant is ranked to four at most.",
    },
    {
      invariantKind: "departure",
      statement: "A morphable skill is worth twelve rank.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the character cannot use is left out of the totals.",
    },
  ],
} as const satisfies WorkspacePackage
