import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperBuildMetadata = {
  id: "01a061c0-88d8-71f3-9d1b-7474ad4a82e1",
  pageTypeSlug: "workspace-package",
  slug: "temper-build-metadata",
  definition: "the name, description and roles a saved build carries beside its state",
  manifest: "json",
  partSlugs: ["module/build-metadata"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character's metadata and a companion's metadata are read by separate calls.",
    },
    {
      invariantKind: "absence",
      statement: "Metadata put back on a state leaves every other field of that state alone.",
    },
  ],
} as const satisfies WorkspacePackage
