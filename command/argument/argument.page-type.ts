import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const argument = {
  id: "01a093fd-9102-76e8-958e-03d34cd41e25",
  type: "page-type/page-type",
  slug: "argument",
  definition: "one thing a command is told on the command line",
  extends: ["page-type/page"],
  parts: [
    "module/argument-naming",
    "module/argument-routing",
    "module/argument-taking",
    "module/argument-word-reading",
    "relation-property/argument",
    "select-property/argument-value",
    "text-property/argument-default",
    "text-property/placeholder",
    "text-property/said",
    "text-property/takes",
  ],
  properties: [
    { pageProperty: "text-property/said", required: true, many: false },
    { pageProperty: "text-property/takes", required: true, many: false },
    { pageProperty: "select-property/argument-value", required: true, many: false },
    { pageProperty: "text-property/placeholder", required: false, many: false },
    { pageProperty: "text-property/argument-default", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page is one argument, and every command taking that argument names the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What an argument carries belongs here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a command needs an argument belongs to that command.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether an argument is said at its flag or as a word belongs to the command that takes it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An argument said as a word is typed as a bare value, and its spelling is shown only as a flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument has two spellings: `said` at its flag, `placeholder` as a word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What an argument carries where no call and no entry says it belongs here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument carrying a default is answered to every command taking it.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every argument a command takes is a page.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A command's code reads its arguments through a type written from these pages.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A key piped into a change is no argument here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many times a command lets an argument be said belongs to that command.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
