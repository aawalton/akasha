import type { Module } from "@akasha/code-system/module"

export const formulaLanguage = {
  id: "01a05c11-6371-7001-83b1-49cef2e9bdd9",
  pageTypeSlug: "module",
  slug: "formula-language",
  definition: "a small language for a value worked out from a page's other values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A formula names a property by putting its key between braces.",
    },
    {
      invariantKind: "departure",
      statement: "A formula names a computed property exactly as it names a stored one.",
    },
    {
      invariantKind: "departure",
      statement: "A formula gives no value a name of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A text literal is written between double quotes.",
    },
    {
      invariantKind: "absence",
      statement: "A text literal holds no double quote of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A reference inside a text literal is filled in place.",
    },
    {
      invariantKind: "departure",
      statement: "A formula joins text by writing references into a text literal.",
    },
    {
      invariantKind: "absence",
      statement: "A formula joins text no other way.",
    },
    {
      invariantKind: "departure",
      statement: "No word other than `true` or `false` or `absent` names a value.",
    },
    {
      invariantKind: "departure",
      statement: "A case is the only way a formula chooses between values.",
    },
    {
      invariantKind: "departure",
      statement: "A case is written as its rows between `case(` and `)`.",
    },
    {
      invariantKind: "departure",
      statement: "A comma parts one case row from the next.",
    },
    {
      invariantKind: "departure",
      statement: "A case row is written as its test then `->` then its value.",
    },
    {
      invariantKind: "departure",
      statement: "Every case ends with an `otherwise` row.",
    },
    {
      invariantKind: "departure",
      statement: "An `otherwise` row is written with the word `otherwise` where its test would be.",
    },
    {
      invariantKind: "departure",
      statement: "A function call is written as its name then its arguments between parentheses.",
    },
    {
      invariantKind: "departure",
      statement: "A comma parts one argument from the next.",
    },
    {
      invariantKind: "departure",
      statement: "`??` binds looser than `&&`.",
    },
    {
      invariantKind: "departure",
      statement: "`&&` binds looser than a comparison.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison binds looser than addition.",
    },
    {
      invariantKind: "departure",
      statement: "Addition binds looser than multiplication.",
    },
    {
      invariantKind: "departure",
      statement: "Multiplication binds looser than negation.",
    },
    {
      invariantKind: "departure",
      statement: "Operators that bind equally group to the left.",
    },
    {
      invariantKind: "departure",
      statement: "Parentheses group.",
    },
    {
      invariantKind: "departure",
      statement: "The only test for text is a case-insensitive substring.",
    },
    {
      invariantKind: "absence",
      statement: "No test matches a whole word.",
    },
    {
      invariantKind: "gap",
      statement: "A property declared `calendar-date` holds a date.",
    },
    {
      invariantKind: "gap",
      statement: "A date fills a text literal as the date is written.",
    },
  ],
} as const satisfies Module
