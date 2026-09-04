import type { Command } from "@akasha/command-system/command"

export const aliRandomLeaf = {
  id: "01a06862-5a9b-7048-800f-5f0f66966f18",
  pageTypeSlug: "command",
  slug: "ali-random-leaf",
  definition: "the command drawing leaves of the Book of Everything at random, none drawn twice",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--status <unopened|resting|any>",
      takes: "which leaves the draw is from, unopened where none is said",
    },
    { said: "--count <n>", takes: "how many leaves are drawn, one where none is said" },
    { said: "--part <1-10>", takes: "the part of the book the draw is held to, by its number" },
    { said: "--subtree <slug>", takes: "the topic the draw is held to, named by its slug" },
    {
      said: "--json",
      takes: "give each leaf as one line of JSON rather than as a tab-separated row",
    },
  ],
  helpNotes: [
    "a leaf is a topic no other topic names as the topic it sits under.",
    "the draw is from the machine's own entropy, and no leaf is drawn twice in one call.",
    "`--part` and `--subtree` each say where to draw from, so one call says one of the two.",
    "asking for more leaves than stand in scope gives back all of them rather than refusing.",
    "every call here draws afresh; `akasha ali-next-unscored` hands back a sweep that can be resumed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draw is made from the machine's own entropy.",
    },
    {
      invariantKind: "departure",
      statement: "No leaf is drawn twice in one call.",
    },
    {
      invariantKind: "departure",
      statement: "A part is named by its number and a subtree by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing matching in scope is refused rather than answered empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Command
