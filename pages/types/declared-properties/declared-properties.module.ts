import type { Module } from "@akasha/code/module"

export const declaredProperties = {
  id: "01a053f6-7bab-764e-b69d-af9ebf0f1558",
  pageTypeSlug: "module",
  slug: "declared-properties",
  definition:
    "the properties a page type or a record property carries, each under the key it is read by",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type has its own properties and the properties of every type above that page type.",
    },
    {
      invariantKind: "departure",
      statement: "The nearest declaration binds.",
    },
    {
      invariantKind: "departure",
      statement: "A slug is looked for under every type descending from `page-type`.",
    },
    {
      invariantKind: "departure",
      statement: "The types descending from `page-type` are read once and held.",
    },
    {
      invariantKind: "departure",
      statement: "`page-type` is tried before every type descending from `page-type`.",
    },
    {
      invariantKind: "departure",
      statement: "Every declaration is answered as well as the binding declaration.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is keyed by the slug its own page states rather than by the slug the declaration names.",
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
      statement: "A page type descending from a file property group declares that group's members.",
    },
    {
      invariantKind: "departure",
      statement: "A page of such a page type states none of those members.",
    },
    {
      invariantKind: "departure",
      statement: "A field is declared by the record property with the field.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration from the type named last binds where two are equally near.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration stating a unique kind has that kind rather than its property's.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration fixing a value is answered with that value beside it.",
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
      statement: "Several listings with one id are answered as one page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Several listings with different ids are answered as no page rather than settled here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the properties this module gathers.",
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
