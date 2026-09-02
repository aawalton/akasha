import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const locationTracesAccess = {
  id: "01a05bc7-9129-700a-81c5-e2dfa20709ec",
  pageTypeSlug: "workspace-package",
  slug: "location-traces-access",
  definition: "the shape one recorded place is carried in, and the refusal a batch of places meets",
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
      invariantKind: "absence",
      statement: "Nothing here keeps a location trace.",
    },
  ],
} as const satisfies WorkspacePackage
