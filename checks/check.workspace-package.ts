import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const check = {
  id: "01a04bc4-7e85-704f-b87e-eac561795185",
  pageTypeSlug: "workspace-package",
  slug: "check",
  definition: "how a change is judged against what must be true of it",
  manifest: "json",
  parts: [
    "module/body-not-utf8",
    "module/refusal-text",
    "page-type/code-check",
    "page-type/model-check",
    "page-type/refusal",
    "module/judged-body",
    "module/judging",
    "module/model-running",
    "module/check-scratch",
    "module/checking",
    "module/change-walking",
    "module/check-cost",
    "module/run-cost",
    "module/shape-saying",
    "module/change-mirror",
    "module/audit-reading",
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
      statement: "Its commit says that no check ran and why.",
    },
    {
      invariantKind: "departure",
      statement: "Audit judges every page.",
    },
    {
      invariantKind: "departure",
      statement: "The other phases judge only the changed pages.",
    },
    {
      invariantKind: "departure",
      statement: "A check's answer is undone by a change to the input the check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "A check's answer is undone by a change to the input the check runs with.",
    },
    {
      invariantKind: "departure",
      statement: "A patch runs a check for a change to the input the check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the input a check runs with is caught at audit.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every check names its input.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every check is cheap enough to run at patch.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every check runs at patch unless Alan has that check off.",
    },
    {
      invariantKind: "departure",
      statement: "An input wider than the answer rests on costs a run that finds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An input narrower than the answer rests on loses a refusal for good.",
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
      statement:
        "No check judges the imports a repository outside akasha takes from inside akasha.",
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
        "Every check has its verdict where the tree contradicts the change the check judges.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "No check but the compiler check exists only to test the claims the compiler tests.",
    },
    {
      invariantKind: "gap",
      statement: "A check that only repeats the compiler does not land.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Do The Work",
      act: "Never add a check for a set of work to be completed; complete the work instead.",
      warrant:
        "A check with nothing left to catch reads like one still working, and every author pays for it.",
      aids: [
        "Ask whether a new violation can arrive tomorrow.",
        "Never refuse a check for arriving in a migration.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Removal First",
      act: "Establish that a check still earns its place before making it faster or more correct.",
      warrant:
        "No check is faster or more correct than one that is not there, and a repair is always available.",
      aids: [
        "Even a small speedup asks the question first.",
        "Never take a check's age for its worth.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Superseded Reach",
      act: "Weigh a check that duplicates a gate by what that gate does not reach, never by what it repeats.",
      warrant:
        "The repetition is what a reader sees, so removal reads as obvious while the gap goes unnamed.",
      aids: [
        "Write down what the gate misses before deciding.",
        "Cut the part of the check the gate reaches.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Header By Hand",
      act: "Repair a header that has gone false by hand, never by gating prose against the code beneath it.",
      warrant:
        "A header is false only against code the reader has in mind and the text never names.",
      aids: [
        "Never delete the header instead of fixing it.",
        "Never repair it by copying the code beneath.",
      ],
    },
  ],
} as const satisfies WorkspacePackage
