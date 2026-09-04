import type { Module } from "@akasha/code-system/module"

export const declaredProperties = {
  id: "01a053f6-7bab-764e-b69d-af9ebf0f1558",
  pageTypeSlug: "module",
  slug: "declared-properties",
  definition:
    "the properties a page type or a record property carries, each under the key it is read by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The properties a page type carries are its own and those of every type above it.",
    },
    {
      invariantKind: "departure",
      statement: "The nearest declaration binds.",
    },
    {
      invariantKind: "departure",
      statement: "Every declaration is answered as well as the binding one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is keyed by what its own page states rather than by the slug the declaration names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration reaching no page property is left out rather than keyed by the declaration's name.",
    },
    {
      invariantKind: "departure",
      statement: "A record property declares its fields as a page type declares its properties.",
    },
    {
      invariantKind: "departure",
      statement: "A field is declared by the record property carrying the field.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration from the type named last binds where two are equally near.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type that cannot be read is refused by name rather than answered as declaring nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says a route of extending that reaches the type that cannot be read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading answering nothing where a type cannot be read says so in its own name.",
    },
    {
      invariantKind: "departure",
      statement: "A page type listed at several paths is read from the listings that answer.",
    },
    {
      invariantKind: "departure",
      statement: "A listing opening nothing is no candidate.",
    },
    {
      invariantKind: "departure",
      statement: "Several listings carrying one id are answered as one page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Several listings carrying different ids are answered as no page rather than settled here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what this module gathers.",
    },
    {
      invariantKind: "absence",
      statement: "Refusing two properties landing on one key is the check's work.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the pages.",
    },
  ],
} as const satisfies Module
