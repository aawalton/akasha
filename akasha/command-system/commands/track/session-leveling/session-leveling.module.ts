import type { Module } from "@akasha/code-system/module"

export const sessionLeveling = {
  id: "01a06868-3956-7058-bd98-818618ad23cf",
  pageTypeSlug: "module",
  slug: "session-leveling",
  definition: "how safe a stretch was and how hard, read from a caller or from the activity pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A safety runs from -2 to 5.",
    },
    {
      invariantKind: "departure",
      statement: "A difficulty runs from 0 to 5.",
    },
    {
      invariantKind: "departure",
      statement: "A level is a whole step or a half step.",
    },
    {
      invariantKind: "departure",
      statement: "A level falling between half steps is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A level outside the range the level is held to is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A level that reads as no number is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A level is written as text rather than as a number.",
    },
    {
      invariantKind: "departure",
      statement: "A whole level is written without a fraction.",
    },
    {
      invariantKind: "departure",
      statement: "A negative half step is written away from zero.",
    },
    {
      invariantKind: "departure",
      statement: "A difficulty no caller said is read off the session activities.",
    },
    {
      invariantKind: "departure",
      statement:
        "An activity matches a title whose lowercase holds the activity's lowercase title.",
    },
    {
      invariantKind: "departure",
      statement: "The highest difficulty among the matching activities wins.",
    },
    {
      invariantKind: "departure",
      statement: "An activity carrying a blank title matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An activity carrying no finite difficulty matches nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "An activity matched inside a longer word is matched all the same.",
    },
    {
      invariantKind: "gap",
      statement: "An activity matches a title by whole words.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
