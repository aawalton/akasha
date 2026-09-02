import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperCharacterBuild = {
  id: "01a061a7-9bb4-7492-9ef4-a2d81d834deb",
  pageTypeSlug: "workspace-package",
  slug: "temper-character-build",
  definition: "the shape a character build is held in, and a new one made",
  manifest: "json",
  partSlugs: ["module/race-source", "module/build-types", "module/build-factory"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The generated table of gear sets is outside akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The module that checks a character build is outside akasha.",
    },
  ],
} as const satisfies WorkspacePackage
