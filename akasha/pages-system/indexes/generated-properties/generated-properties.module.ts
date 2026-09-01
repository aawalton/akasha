import type { Module } from "@akasha/code-system/module"

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
        "Which properties are generated is read from the pages the index names rather than from code.",
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
      statement:
        "A property taking a generator and the first page leaning on that property land together.",
    },
    {
      invariantKind: "departure",
      statement: "The slugs come back in one order.",
    },
    {
      invariantKind: "departure",
      statement: "A property carries the key it is read by alongside the slug it is reached by.",
    },
    {
      invariantKind: "departure",
      statement:
        "That key is read from what the property states rather than camelised from a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A reader asking for slugs and one asking for keys are answered separately.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a value waits for the checks is read from the generator kind's own page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The two kinds are told apart by what the two kinds say rather than by their names.",
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
      statement: "Nothing here works a value out or fills a value in.",
    },
  ],
} as const satisfies Module
