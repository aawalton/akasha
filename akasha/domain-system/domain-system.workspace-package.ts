import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

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
    "page-type/list",
    "page-type/invariant-kind",
    "page-type/directive-kind",
    "page-type/taboo-term",
    "page-type/sentence-shape",
    "workspace-package/plain-language",
    "domain/purpose",
  ],
  invariants: [
    {
      invariantKind: "gap",
      statement: "Everything Alan wants done is a finding or an intent.",
    },

    {
      invariantKind: "departure",
      statement: "Context a choice does not need does not reach the agent making that choice.",
    },
    {
      invariantKind: "gap",
      statement:
        "Agents have the context each choice needs at the time those agents make that choice.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's attributes represent the choices that seat will make.",
    },
  ],
} as const satisfies WorkspacePackage
