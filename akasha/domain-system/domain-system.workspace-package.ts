import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const domainSystem = {
  id: "01a04a26-9105-7001-a1cc-60a031152982",
  pageTypeSlug: "workspace-package",
  slug: "domain-system",
  definition: "how we define how things should be",
  manifest: "json",
  partSlugs: [
    "page-type/domain",
    "page-type/finding",
    "page-type/initiative",
    "page-type/invariant-group",
    "page-type/invariant-kind",
    "page-type/directive-kind",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Context a choice does not need does not reach the agent making it.",
    },
    {
      invariantKind: "gap",
      statement: "Agents have the context each choice needs at the time they make it.",
    },
  ],
} as const satisfies WorkspacePackage
