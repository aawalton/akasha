import type { Module } from "../../../code-system/module/module.page-type.ts"

export const generatedProperties = {
  id: "01a04f2b-3d23-790e-b2f2-a9b1e6846e6f",
  pageTypeSlug: "module",
  slug: "generated-properties",
  definition: "which page properties state a generator, which kind works each out, and when",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which properties are generated is read from the pages the index names rather than from a list written in code.",
    },
    {
      invariantKind: "departure",
      statement: "A property is generated when it states a generator.",
    },
    {
      invariantKind: "departure",
      statement: "A third generator kind is answered here with no code changed.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are reached through the shadow of the change being judged.",
    },
    {
      invariantKind: "departure",
      statement: "A property taking a generator and the first page leaning on it land together.",
    },
    {
      invariantKind: "departure",
      statement: "The slugs come back in one order.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a value waits for the checks is read from the generator kind's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The two kinds are told apart by what they say rather than by their names.",
    },
    {
      invariantKind: "departure",
      statement: "A generator naming a kind that stands nowhere is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The shadow is what is asked rather than a root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works a value out or fills one in.",
    },
  ],
} as const satisfies Module
