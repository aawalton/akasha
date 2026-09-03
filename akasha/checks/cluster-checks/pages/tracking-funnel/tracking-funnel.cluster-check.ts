import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const trackingFunnel = {
  id: "01a06866-8b85-7798-a42c-4ca29b3c1f74",
  pageTypeSlug: "cluster-check",
  slug: "tracking-funnel",
  definition:
    "the check refusing a reach of a tracking day outside akasha that goes around the day-place funnel",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A finding is a file that both names a day page type and can reach the page store.",
    },
    {
      invariantKind: "departure",
      statement: "Naming travels through renames, through barrels, and through package exports.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching follows imports to any depth rather than reading one file alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The population is walked rather than listed, because a list cannot say what it left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that could not read a path it named refuses rather than reporting coverage.",
    },
    {
      invariantKind: "departure",
      statement: "This refuses on a finding, where its neighbours in the audit family only report.",
    },
    {
      invariantKind: "departure",
      statement: "A reach the funnel does not govern is named in the code rather than passed over.",
    },
    {
      invariantKind: "gap",
      statement:
        "The population empties when every file has arrived in akasha, and this check goes.",
    },
  ],
} as const satisfies ClusterCheck
