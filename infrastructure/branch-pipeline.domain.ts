import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const branchPipeline = {
  id: "01a0675b-16d7-7a3d-9aa2-6957d265a593",
  pageTypeSlug: "domain",
  slug: "branch-pipeline",
  definition: "one run of the checks a branch's commits need",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A branch pipeline is started by somebody asking for it rather than by a push or a deploy.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every failing suite is charged to the branch, whatever that suite does at any other ref.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing it runs is run at a commit other than the branch's own head.",
    },
    {
      invariantKind: "departure",
      statement: "A run that did not account for itself yields no verdict rather than a green one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's checks are those the change from the branch's live commit to its head reaches.",
    },
  ],
} as const satisfies Domain
