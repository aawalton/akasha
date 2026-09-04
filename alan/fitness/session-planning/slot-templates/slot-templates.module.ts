import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const slotTemplates = {
  id: "01a0685e-89d5-7fa1-8f7b-d55c8606523e",
  pageTypeSlug: "module",
  slug: "slot-templates",
  definition:
    "the slots each focus asks for, in order, and what each role is prescribed by default",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A template names patterns rather than movements.",
    },
    {
      invariantKind: "departure",
      statement: "The first slot of a template is the one the session is anchored on.",
    },
    {
      invariantKind: "departure",
      statement: "A slot marked optional going unfilled is no gap.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slot marked flexible takes a pattern the week still owes ahead of a better one.",
    },
    {
      invariantKind: "departure",
      statement: "A focus no template names is trained as full body.",
    },
    {
      invariantKind: "gap",
      statement: "A focus a day may be scheduled as is narrower than a focus a session may take.",
    },
  ],
} as const satisfies Module
