import type { Module } from "../modules/module.page-type.ts"

export const codeTokens = {
  id: "01a06558-3a63-729e-8295-2e17302585fe",
  pageTypeSlug: "module",
  slug: "code-tokens",
  definition:
    "the strings, templates and call arguments a body holds, and that body with them blanked",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One reading answers every token that reading passes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A masked body blanks every string and template piece and comment the source held.",
    },
    {
      invariantKind: "departure",
      statement: "A masked body keeps every newline the source held.",
    },
    {
      invariantKind: "departure",
      statement: "A masked body is as long as the source.",
    },
    {
      invariantKind: "departure",
      statement:
        "A template is answered as the template's literal pieces and the template's expressions.",
    },
    {
      invariantKind: "departure",
      statement: "A template inside a template expression is read as a template of its own.",
    },
    {
      invariantKind: "absence",
      statement: "A string holding an escape is answered with no value.",
    },
    {
      invariantKind: "departure",
      statement: "A slash opens a pattern only where what precedes the slash cannot end a value.",
    },
    {
      invariantKind: "departure",
      statement: "A call's arguments are answered as the span each argument covers.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call whose bracket never closes is answered as nothing rather than as no arguments.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "gap",
      statement: "This reads a body without a parser where the tree already carries one.",
    },
  ],
} as const satisfies Module
