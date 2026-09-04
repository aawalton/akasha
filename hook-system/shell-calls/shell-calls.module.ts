import type { Module } from "@akasha/code-system/module"

export const shellCalls = {
  id: "01a04eab-4522-7000-9e89-8627b48fbcc5",
  pageTypeSlug: "module",
  slug: "shell-calls",
  definition: "a shell command line cut into the segments and words it carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line continuation is joined before the line is cut.",
    },
    {
      invariantKind: "departure",
      statement: "A quoted run holding one bare word is unquoted before the cut.",
    },
    {
      invariantKind: "departure",
      statement: "Every other quoted run is taken out before the cut.",
    },
    {
      invariantKind: "departure",
      statement: "A newline cuts as a separator does.",
    },
    {
      invariantKind: "departure",
      statement: "Every separator form cuts too.",
    },
    {
      invariantKind: "departure",
      statement: "An empty segment is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "Leading space is taken off the ones kept.",
    },
    {
      invariantKind: "departure",
      statement: "A word is matched by its basename.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that only runs the call behind the prefix is stepped over.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix's own flags are stepped over with the prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix flag taking a value takes the word after that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix takes the numbers the prefix is named as taking and no other word.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix flag that asks rather than runs leaves no call.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix behind a prefix is stepped over too.",
    },
    {
      invariantKind: "departure",
      statement: "A variable assignment before a call is stepped over.",
    },
    {
      invariantKind: "absence",
      statement: "The text is cut here rather than read for what the text means.",
    },
    {
      invariantKind: "absence",
      statement: "No tool a hook guards is named here.",
    },
    {
      invariantKind: "constraint",
      statement: "This reads a shell command line without being a shell.",
    },
    {
      invariantKind: "constraint",
      statement: "A shell marks no word as one that runs the call behind it.",
    },
    {
      invariantKind: "gap",
      statement: "Every hook cuts a command line the same way without saying how twice.",
    },
    {
      invariantKind: "gap",
      statement: "A prefix this does not name hides the call behind it from every hook.",
    },
  ],
} as const satisfies Module
