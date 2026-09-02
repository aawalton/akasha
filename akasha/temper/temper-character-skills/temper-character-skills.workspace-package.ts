import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperCharacterSkills = {
  id: "01a0617a-2c72-7654-ad18-45a07d7e27ca",
  pageTypeSlug: "workspace-package",
  slug: "temper-character-skills",
  definition: "the skills an Elder Scrolls Online character learns, slots and scribes",
  manifest: "json",
  partSlugs: [
    "module/character-skill-activation-types",
    "module/character-skill-template",
    "module/grimoire-template",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every table here is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill's place in the whole table is the index a build hash carries.",
    },
  ],
} as const satisfies WorkspacePackage
