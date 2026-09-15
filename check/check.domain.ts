import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const check = {
  id: "01a04bc4-7e85-704f-b87e-eac561795185",
  type: "page-type/domain",
  slug: "check",
  definition: "how a change is judged against what must be true of it",
  parts: [
    "domain/test",
    "module/audit-asking",
    "module/audit-child",
    "module/audit-request",
    "module/audit-serving",
    "module/audit-verdict",
    "module/body-not-utf8",
    "module/change-mirror",
    "module/change-walking",
    "module/check-cost",
    "module/check-measuring",
    "module/checking",
    "module/judging",
    "module/model-running",
    "module/mortal-sparing",
    "module/refusal-holding",
    "module/refusal-text",
    "module/router-app-code",
    "module/shape-saying",
    "page-type/check-code",
    "page-type/check-model",
    "page-type/refusal",
    "service-workstation/audit-running",
    "test-fixture/check-scratch",
    "test-fixture/check-staging",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change is judged before the change reaches disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refused change leaves nothing behind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change may land with no check run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The checks judging a change are the checks the change leaves rather than every check filed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Audit judges every page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The other phases judge only the changed pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check's answer is undone by a change to the input the check runs on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check's answer is undone by a change to the input the check runs with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change runs a check for a change to the input the check runs on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change to the input a check runs with leaves the pages already landed unjudged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a page is judged when that page is next changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a page is judged where the check is asked for by name.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "Every check names its input.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "Every check is cheap enough to run at change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check's ceiling is stated in time rather than in processes alive.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "Every check runs at change unless Alan has that check off.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "Every check that runs at change runs at deploy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An input wider than the answer rests on costs a run that finds nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An input narrower than the answer rests on loses a refusal for good.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check reads the index together with the change rather than the index alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check no change ran is unmeasured rather than sound.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check a process could not finish is unmeasured rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unmeasured check is counted and told apart from a check that refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "No check judges the imports a repository outside akasha takes from inside akasha.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No check judges whether a change made an invariant on another page false.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement:
        "No check but the compiler check exists only to test the claims the compiler tests.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "A check that only repeats the compiler does not land.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run is held to the ceiling stated for the code that ran rather than for the phase.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
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
      directiveKind: "directive-kind/principle",
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
      directiveKind: "directive-kind/principle",
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
      directiveKind: "directive-kind/rule",
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
} as const satisfies Domain
