import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverRegistry = {
  id: "01a0657d-a75e-7003-ad87-1205dd4ec929",
  type: "page-type/module",
  slug: "recipient-resolver-registry",
  definition: "the list of seats that messages start",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story of any kind naming the seat that runs it declares a spec for that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master seat is started by its game's action bar and its world builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a played story's game master is started by the action bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A world builder seat is started by its game's game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game with a world builder seat has a writer seat as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each of a game's three seats is started by a notice that a turn moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer seat is started by that notice alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each reviewer and recorder seat of a game has a spec, named as the advance names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer or recorder seat is resumed by its job or by its game master's message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer or recorder seat that never ran is started by its job's advance alone.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game seat named for its persona, role and game carries what it starts as where it never ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game seat is the action bar's player's seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplay seat is started as a game master seat is, by the same messages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplay seat that never ran starts headless, prompted to narrate its story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story whose coordinator is a roleplay seat has no other seat here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spec is named once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first spec of a name is the spec kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declared spec is kept over a persona or a person handler of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person no persona answers for arms no spec.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person handler's spec is read off the person's page alone.",
    },
  ],
  createdAt: "2026-09-03T04:18:48.798Z",
  updatedAt: "2026-10-24T20:39:57.157Z",
} as const satisfies Module
