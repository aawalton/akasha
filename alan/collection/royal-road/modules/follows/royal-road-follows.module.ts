import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadFollows = {
  id: "01a0e986-f314-7174-aae1-bf1aabba3853",
  type: "page-type/module",
  slug: "royal-road-follows",
  definition: "the fictions Alan follows on Royal Road and the last chapter he read in each",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The follow list is read signed in as the royal road account alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sign-in takes the token the sign-in form holds and the cookie handed out with that form.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in answered with no signed-in cookie refuses the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page of the follow list is read, as many as its paging names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A followed fiction is known by the id and slug its title links to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapter last read is the chapter the list says was last read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fiction with no chapter read names no chapter last read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty follow list refuses the run.",
    },
  ],
} as const satisfies Module
