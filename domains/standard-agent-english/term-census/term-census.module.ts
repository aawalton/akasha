import type { Module } from "@akasha/code/module"

export const termCensus = {
  id: "01a07c71-9914-7a3e-b8cd-e3395002ebdb",
  pageTypeSlug: "module",
  slug: "term-census",
  definition: "every term a text holds, and whether a page defines that term",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A term inside backticks is one term rather than the words that term holds.",
    },
    {
      invariantKind: "departure",
      statement: "A term outside backticks is common language.",
    },
    {
      invariantKind: "departure",
      statement: "A term is defined where a page carries that term as a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A name written in camel is read as the same name written in kebab.",
    },
    {
      invariantKind: "stopgap",
      statement: "A page address is read as a term rather than as code.",
    },
    {
      invariantKind: "gap",
      statement:
        "A term is read from an invariant statement rather than from every text akasha holds.",
    },
  ],
} as const satisfies Module
