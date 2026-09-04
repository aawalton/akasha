import type { Module } from "@akasha/code-system/module"

export const judgedSaying = {
  id: "01a06416-44f2-7385-b6de-88045505b3db",
  pageTypeSlug: "module",
  slug: "judged-saying",
  definition: "what an answer says the checks judged, counted over the paths a check reaches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check reaches a path inside this checkout and no other.",
    },
    {
      invariantKind: "departure",
      statement: "A draft answers with what the checks refused rather than with a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A count over a draft says whether a check refused.",
    },
    {
      invariantKind: "departure",
      statement: "A count over a draft a check refused leads into what refused.",
    },
    {
      invariantKind: "departure",
      statement: "A patch a check refused applies once the paths that patch holds pass.",
    },
    {
      invariantKind: "departure",
      statement: "A count of what was judged names the paths a check reached.",
    },
    {
      invariantKind: "departure",
      statement: "The paths asked for are not the paths judged.",
    },
    {
      invariantKind: "departure",
      statement: "A count naming fewer paths than were asked for says how many of them it names.",
    },
    {
      invariantKind: "departure",
      statement: "Reach is answered before the phase.",
    },
    {
      invariantKind: "departure",
      statement: "A path no check reaches is never said to be unjudged for its phase.",
    },
    {
      invariantKind: "departure",
      statement:
        "The line counting what was judged and the line naming the rest are built from one rule.",
    },
    {
      invariantKind: "departure",
      statement: "The counting is handed in rather than reached for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a check ran is answered by the caller.",
    },
  ],
} as const satisfies Module
