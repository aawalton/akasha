import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const rulesEngine = {
  id: "01a0657b-9adc-7003-a1af-d02c5457d479",
  pageTypeSlug: "workspace-package",
  slug: "rules-engine",
  definition:
    "which rule claims a subject, and what a set of rules leaves overlapping or unclaimed",
  manifest: "json",
  partSlugs: [
    "module/instructions-rule",
    "module/rule-conditions",
    "module/rule-partition",
    "module/rule-vocabulary",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule's match is a list of conditions over named fields.",
    },
    {
      invariantKind: "departure",
      statement: "The type of a field says which comparisons that field admits.",
    },
    {
      invariantKind: "departure",
      statement: "A negated comparison has one spelling of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a rule from disk.",
    },
  ],
} as const satisfies WorkspacePackage
