import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSkillMorphsAccess = {
  id: "01a061e2-5e38-795d-b1f0-b50d142c48d5",
  pageTypeSlug: "workspace-package",
  slug: "temper-skill-morphs-access",
  definition: "the morph progress a saved completion row carries",
  manifest: "json",
  partSlugs: [
    "module/morph-completion-shapes",
    "module/eso-id-helpers",
    "module/character-skill-morph-transform",
    "module/skill-morphs-checker",
    "module/skill-morphs-resolver",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A completion row names the game's own numbers rather than akasha ids.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying no completion is read as no progress.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the game numbers zero is left out of the maps here.",
    },
  ],
} as const satisfies WorkspacePackage
