import type { WorkspacePackage } from "../../../code-system/workspace-packages/workspace-package.page-type.ts"

export const storyTowerEngine = {
  id: "01a05bc6-fa4a-7005-8f08-d59b290679dd",
  pageTypeSlug: "workspace-package",
  slug: "story-tower-engine",
  definition: "how one attack in a tower game is worked out from two sheets and a seed",
  manifest: "json",
  partSlugs: ["module/combat-types", "module/derive", "module/rng", "module/resolve-action"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches for a package.",
    },
    {
      invariantKind: "departure",
      statement: "An attack changes neither combatant the attack was handed.",
    },
    {
      invariantKind: "departure",
      statement: "Every number an attack rests on is worked out from the sheets handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An attack answers with a line describing itself.",
    },
  ],
} as const satisfies WorkspacePackage
