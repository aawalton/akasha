import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sessionLeveling = {
  id: "01a06868-3956-7058-bd98-818618ad23cf",
  type: "module",
  slug: "session-leveling",
  definition: "how safe a stretch was and how hard, read from a caller or from the activity pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A safety runs from -2 to 5.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A difficulty runs from 0 to 5.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is a whole step or a half step.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level falling between half steps is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level outside the range the level is held to is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level that reads as no number is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is written as text rather than as a number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A whole level is written without a fraction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A negative half step is written away from zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A difficulty no caller said is read off the session activities.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An activity matches a title whose lowercase has the activity's lowercase title as a whole word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A match touching a letter or a digit or an underscore is no whole word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The highest difficulty among the matching activities wins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An activity with a blank title matches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An activity with no finite difficulty matches nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
