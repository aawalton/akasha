import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const helpWriting = {
  id: "01a093f7-d398-7512-8b9c-b2446f05e2d3",
  type: "module",
  slug: "help-writing",
  definition: "what a command's page states, written down for a caller",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A help answer opens with the call and the definition handed for that call.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed no definition opens with the call alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating what a command takes has a surface.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating help notes has a surface.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating neither has none.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments are padded to the widest of them so what each takes lines up.",
    },
    {
      invariantKind: "departure",
      statement: "The help notes are written under the arguments.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a page.",
    },
  ],
} as const satisfies Module
