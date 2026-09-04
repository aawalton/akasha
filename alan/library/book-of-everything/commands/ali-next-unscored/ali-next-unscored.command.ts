import type { Command } from "@akasha/command-system/command"

export const aliNextUnscored = {
  id: "01a06862-5a9b-7239-814f-fc05720c5073",
  pageTypeSlug: "command",
  slug: "ali-next-unscored",
  definition: "the command handing back one topic of the Book of Everything nobody has opened yet",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--random", takes: "draw an unopened leaf at random rather than take the first" },
    {
      said: "--under <slug>",
      takes: "the topic the draw is held to, the whole book where none is said",
    },
    {
      said: "--json",
      takes: "give the leaf as one line of JSON rather than as a tab-separated row",
    },
  ],
  helpNotes: [
    "a leaf is a topic no other topic names as the topic it sits under.",
    "the draw is from unopened leaves alone, which is exactly what the rotation queue leaves out.",
    "without `--random` the same leaf comes back until it is opened, so a sweep can be picked up where it was left.",
    "`--under` names a topic by its slug rather than by a path.",
    "the row is the slug, the label and the status, parted by tabs.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The draw is from unopened leaves alone.",
    },
    {
      invariantKind: "departure",
      statement: "The first leaf is the first in the order the tree is read.",
    },
    {
      invariantKind: "departure",
      statement: "A random draw is made from the machine's own entropy.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing unopened in scope is refused rather than answered empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Command
