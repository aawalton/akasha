import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const checks = {
  id: "01a04bc4-7e85-704f-b87e-eac561795185",
  pageTypeSlug: "workspace-package",
  slug: "checks",
  definition: "how a change is judged against what must be true of it",
  manifest: "json",
  partSlugs: [
    "page-type/code-check",
    "page-type/cluster-check",
    "page-type/model-check",
    "page-type/refusal",
    "module/check-view",
    "module/judging",
    "module/model-running",
    "module/check-scratch",
    "module/checking",
    "module/change-walking",
    "module/check-cost",
    "module/run-cost",
    "module/shape-saying",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is judged before the change reaches disk.",
    },
    {
      invariantKind: "departure",
      statement: "A refused change leaves nothing behind.",
    },
    {
      invariantKind: "departure",
      statement: "A change may land with no check run.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks judging a change are the checks the change leaves rather than every check filed.",
    },
    {
      invariantKind: "departure",
      statement: "Its commit says that none ran and why.",
    },
    {
      invariantKind: "departure",
      statement: "Audit judges every page.",
    },
    {
      invariantKind: "departure",
      statement: "The other phases judge only what changed.",
    },
    {
      invariantKind: "departure",
      statement: "A check's answer is undone by a change to what the check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "A check's answer is undone by a change to what the check runs with.",
    },
    {
      invariantKind: "departure",
      statement: "A patch runs a check for a change to what the check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "A change to what a check runs with is caught at audit.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every check says what its input is.",
    },
    {
      invariantKind: "departure",
      statement: "An input wider than what the answer rests on costs a run that finds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An input narrower than what the answer rests on loses a refusal for good.",
    },
    {
      invariantKind: "departure",
      statement: "A check reads the index together with the change rather than the index alone.",
    },
    {
      invariantKind: "departure",
      statement: "A check no change woke is unmeasured rather than sound.",
    },
    {
      invariantKind: "absence",
      statement: "No check judges what a repository outside akasha imports from inside akasha.",
    },
    {
      invariantKind: "gap",
      statement: "A check runs over the changes the check was given rather than over the pages.",
    },
    {
      invariantKind: "gap",
      statement: "A check asks the index for anything beyond the change the check was handed.",
    },
    {
      invariantKind: "gap",
      statement: "Every phase a check states is reached by a caller that runs the check.",
    },
    {
      invariantKind: "gap",
      statement:
        "Every check holds its verdict where the tree contradicts the change the check judges.",
    },
  ],
} as const satisfies WorkspacePackage
