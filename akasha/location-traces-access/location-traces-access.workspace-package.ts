import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const locationTracesAccess = {
  id: "01a05bc7-9129-700a-81c5-e2dfa20709ec",
  pageTypeSlug: "workspace-package",
  slug: "location-traces-access",
  definition: "the places Alan's phone recorded, kept on the ESO day each was captured in",
  manifest: "json",
  partSlugs: ["module/trace-shape", "module/trace-rows", "module/trace-insert"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the phone a trace came from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a trace back out.",
    },
    {
      invariantKind: "departure",
      statement: "A trace already stored is never written over.",
    },
  ],
} as const satisfies WorkspacePackage
