import type { Domain } from "../domains/domain.page-type.ts"

export const akashaCheck = {
  id: "01a049e9-651c-7008-b4db-b19f7b063ac1",
  pageTypeSlug: "domain",
  slug: "akasha-check",
  definition: "a judgement passed on a change before it lands",
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "No check stands only to test what the compiler tests apart from the one that runs it.",
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
} as const satisfies Domain
