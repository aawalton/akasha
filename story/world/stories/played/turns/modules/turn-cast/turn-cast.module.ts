import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnCast = {
  id: "01a0ea6e-4e6c-7af1-9a9e-477f55abd52a",
  type: "page-type/module",
  slug: "turn-cast",
  definition: "which characters of a story a writer's prose names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer's advance lists every character of the story its prose names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose names a character by the character's whole title or its first word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name counts only as a whole word opening with a capital, in its own case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name the prose also has in lower case is taken as a common word and passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Listing a name another name is read as lists that other name as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal names each missing character by its address and never quotes the prose.",
    },
  ],
} as const satisfies Module
