import type { Module } from "@akasha/code-system/module"

export const warranting = {
  id: "01a04ee0-3078-7000-9069-e5db5da797ad",
  pageTypeSlug: "module",
  slug: "warranting",
  definition: "the readings a change owes, and which of them the record does not answer for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every path a change names is asked for the warrants that path carries.",
    },
    {
      invariantKind: "departure",
      statement: "A path clears its warrant by answering rather than by going unasked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading answers for a warrant by object id alone rather than by when the object was read.",
    },
    {
      invariantKind: "departure",
      statement: "A warrant carries why the reading is owed.",
    },
    {
      invariantKind: "departure",
      statement: "A body only part of which reached the agent answers no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "A body read in part is owed as read in part rather than as changed.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a body read in part says how far that body reached the agent.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the reading owed rather than only saying something is owed.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the read that would answer the warrant ready to run.",
    },
    {
      invariantKind: "absence",
      statement: "A refusal says nothing about how a read behaves.",
    },
    {
      invariantKind: "departure",
      statement: "The readings owed are held to the ceiling one answer carries.",
    },
    {
      invariantKind: "departure",
      statement: "A list held back says how many readings are owed past it and to call again.",
    },
    {
      invariantKind: "departure",
      statement: "The list is held to that ceiling here rather than by the list's reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call charged to no agent is refused whole and said to be impossible rather than merely wrong.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants apply to an authored change alone.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here records.",
    },
    {
      invariantKind: "departure",
      statement: "Warranting is asked and warranting answers.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant is the reading a change owes rather than the reading changing a warranted file would owe.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read is handed each named path followed by the paths warrants running on read name for the path.",
    },
    {
      invariantKind: "departure",
      statement:
        "Within the paths a read is handed a path sits once in the place that path first sat.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants that cannot be worked out hand back the paths handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The page a seat owes from sits at its id.",
    },
    {
      invariantKind: "departure",
      statement: "An agent owes the readings its own page names rather than the page itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page a subagent owes from sits at the seat's name and the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent owes the readings its own page names rather than the readings its seat's page names.",
    },
    {
      invariantKind: "departure",
      statement: "An agent that sits at no page owes nothing of a page.",
    },
    {
      invariantKind: "departure",
      statement: "A warrant owed of a taboo term is said before every warrant that is not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant owed of a taboo term is told from the rest by the page type its path names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal said of a taboo term asks the writer for a decision about the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal said of a taboo term names reading that term's page as clearing the warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants owed of no taboo term keep the order the warrants were worked out in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change's readings and the writing seat's readings are ordered as one answer rather than two lists.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing is changed that its writer has not read.",
    },
  ],
} as const satisfies Module
