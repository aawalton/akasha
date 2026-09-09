import type { Module } from "@akasha/code/module"

export const termCensus = {
  id: "01a07c71-9914-7a3e-b8cd-e3395002ebdb",
  pageTypeSlug: "module",
  type: "module",
  slug: "term-census",
  definition: "every term a text holds, and whether a page defines that term",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A term inside backticks is one term rather than the words that term has.",
    },
    {
      invariantKind: "departure",
      statement: "A term outside backticks is common language.",
    },
    {
      invariantKind: "departure",
      statement: "A domain name is a defined term.",
    },
    {
      invariantKind: "departure",
      statement: "A word a term page spells is a defined term.",
    },
    {
      invariantKind: "departure",
      statement: "A banned word is defined as surely as an allowed one.",
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
