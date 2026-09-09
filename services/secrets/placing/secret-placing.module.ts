import type { Module } from "@akasha/code/module"

export const secretPlacing = {
  id: "01a06977-65e5-74e7-9c45-ae62673340e9",
  pageTypeSlug: "module",
  slug: "secret-placing",
  definition:
    "the secret values a plan's manifests ask for, put into the cluster from secret pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value placed in the cluster comes from a secret page and from nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "One page places its value into every resource and key that page names.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two secret pages placing a value in one resource at one key is refused before anything is applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "One page naming a resource and key twice is refused for the same reason two pages are.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no placement has a value nothing asks for and is read past.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest asking for a secret no page has is reported rather than passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a secret page.",
    },
  ],
} as const satisfies Module
