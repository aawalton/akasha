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
      statement: "Every path a change names is asked what the path warrants.",
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
      statement: "A refusal says what is owed rather than only that something is.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the read that would answer the warrant ready to run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call charged to no agent is refused whole and said to be impossible rather than merely wrong.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants stand over an authored change alone.",
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
        "A warrant is what the change owes rather than what changing a warranted file would owe.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read is handed each named path followed by what the warrants running on read name for the path.",
    },
    {
      invariantKind: "departure",
      statement: "Within what a read is handed a path stands once in the place it first stood.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants that cannot be worked out hand back the paths handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The page a seat owes from is the one standing at its id.",
    },
    {
      invariantKind: "departure",
      statement: "An agent owes what its own page names rather than the page itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page a subagent owes from sits at the seat's name and the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent owes what its own page names rather than what its seat's does.",
    },
    {
      invariantKind: "departure",
      statement: "An agent standing at no page owes nothing of a page.",
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
      statement: "What is said of a taboo term asks the writer for a decision about the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is said of a taboo term names reading that term's page as what clears the warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants owed of no taboo term keep the order the warrants were worked out in.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a change owes and what the writing seat owes are ordered as one answer rather than two lists.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing is changed that its writer has not read.",
    },
  ],
} as const satisfies Module
