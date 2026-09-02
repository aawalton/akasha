import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCharacterSources = {
  id: "01a060ea-ac66-7120-a995-b58614b651f2",
  pageTypeSlug: "workspace-package",
  slug: "temper-character-sources",
  definition:
    "the effect sources a character build carries beyond its class, race, gear and skills",
  manifest: "json",
  partSlugs: [
    "module/alliances",
    "module/character-roles",
    "module/curses",
    "module/curse-source",
    "module/vampire-stages",
    "module/target-armors",
    "module/target-source",
    "module/base-source",
    "module/attributes-source",
    "module/eso-plus-source",
    "module/food-source",
    "module/drink-source",
    "module/food-or-drink-source",
    "module/mundus-source",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character's class and race are named outside this package.",
    },
    {
      invariantKind: "departure",
      statement: "A character's gear is named outside this package.",
    },
  ],
} as const satisfies WorkspacePackage
