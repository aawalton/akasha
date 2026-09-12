import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const argument = {
  id: "01a093fd-9102-76e8-958e-03d34cd41e25",
  type: "page-type",
  slug: "argument",
  definition: "one thing a command is told on the command line",
  pluralSlug: "arguments",
  extends: ["page-type/page"],
  parts: [
    "select-property/argument-value",
    "text-property/placeholder",
    "text-property/said",
    "text-property/takes",
    "relation-property/argument",
    "module/argument-taking",
    "module/argument-naming",
  ],
  properties: [
    { pageProperty: "text-property/said", required: true, many: false },
    { pageProperty: "text-property/takes", required: true, many: false },
    { pageProperty: "select-property/argument-value", required: true, many: false },
    { pageProperty: "text-property/placeholder", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page is one argument, and every command taking that argument names the page.",
    },
    {
      invariantKind: "departure",
      statement: "What an argument carries belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a command needs an argument belongs to that command.",
    },
    {
      invariantKind: "gap",
      statement: "Every argument a command takes is a page.",
    },
    {
      invariantKind: "gap",
      statement: "A command's code reads its arguments through a type written from these pages.",
    },
    { invariantKind: "absence", statement: "A key piped into a change is no argument here." },
    {
      invariantKind: "departure",
      statement: "How many times a command lets an argument be said belongs to that command.",
    },
  ],
  types: "ts",
} as const satisfies PageType
