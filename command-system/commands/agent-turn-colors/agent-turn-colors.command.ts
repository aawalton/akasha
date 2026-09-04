import type { Command } from "../command.page-type.ts"

export const agentTurnColors = {
  id: "01a0693c-9b24-7a22-8c27-03b9194b117e",
  pageTypeSlug: "command",
  slug: "agent-turn-colors",
  definition: "the color each named agent, or each named turn state, is drawn in",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<agent id>", takes: "an agent to answer for, said as a bare word. Repeatable." },
    {
      said: "--state <name>",
      takes: "a turn state to answer for rather than an agent. Repeatable.",
    },
  ],
  helpNotes: [
    "it prints one JSON object and nothing else, carrying a `colors` record keyed by what was asked for.",
    "ids and states are never asked for together, so the key a color is filed under is one thing rather than two.",
    "an agent is answered only where records of its own could be kept for it, so an id no seat ever held is simply absent.",
    "an id nothing knows about is no error: a caller asking about a terminal that turned out to hold no seat wants no color rather than a refusal.",
    "an id carrying `--` names a subagent, and is read as the seat before the mark and the subagent after it.",
    "a subagent is working or stopped and never anything between, its turn ending when it returns to the seat that ran it.",
    "one that has returned reads stopped while the seat above it goes on working, and one whose seat has stopped reads stopped with it.",
    "a seat that kept records before any hook stamped one reads as idle, which is what an older seat is.",
    "that is why the answer turns on whether the seat kept anything at all rather than on whether a hook has run.",
    "asking by state reads no agent, and is what a drawer wants where it knows the state already and holds no id to ask under.",
    "every subagent a panel draws is working, and a synchronous one has no id of its own until it has finished.",
    "a name no turn state carries is refused rather than left out, since a caller asking by state knows what it asked.",
    "`color` is the name that state's own page carries rather than a shade, so whatever draws it picks the color out of its own palette.",
    "every turn state names one, a stopped one included.",
    "a state's page is read off disk on every call rather than kept, so a color rewritten under a held-open server is the one it next answers.",
    "it reads the agents' own records and this repository and reaches no database, so a tab strip asking it keeps its colors through an outage.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Agent ids and turn states are never asked for in one call.",
    },
    {
      invariantKind: "departure",
      statement: "An agent no records could be kept for is left out rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name no turn state carries is refused rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A turn state's color is read off that state's own page.",
    },
    {
      invariantKind: "departure",
      statement:
        "That page is read again on every call, so a color rewritten under this is answered.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is working or stopped and never anything between.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that kept records before a hook stamped one reads as idle.",
    },
    {
      invariantKind: "departure",
      statement: "A color is a name a palette reads rather than a shade.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a database.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
