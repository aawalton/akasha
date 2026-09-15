import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeTokens = {
  id: "01a06558-3a63-729e-8295-2e17302585fe",
  type: "module",
  slug: "code-tokens",
  definition:
    "the strings, templates and call arguments a body holds, and that body with them blanked",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One reading answers every token that reading passes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A masked body blanks every string and template piece and comment the source held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A masked body keeps every newline the source held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A masked body is as long as the source.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A template is answered as the template's literal pieces and the template's expressions.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A template inside a template expression is read as a template of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A string with an escape is answered with no value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A slash opens a pattern only where the token before the slash cannot end a value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call's arguments are answered as the span each argument covers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call whose bracket never closes is answered as nothing rather than as no arguments.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "This module reads a body without a parser where the tree already has a parse.",
    },
  ],
} as const satisfies Module
