import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const workspacePaths = {
  id: "01a05c48-deeb-700a-a48e-da9f2becaa1d",
  type: "domain",
  slug: "workspace-paths",
  definition: "which folders of a repository no file accounts for",
  parts: ["module/stale-folders"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is taken as an argument rather than worked out from here.",
    },
  ],
} as const satisfies Domain
