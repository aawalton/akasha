import type { Module } from "@akasha/code-system/module"

export const secretSaying = {
  id: "01a07667-e09b-7f6e-bc84-5a76ea3566f4",
  pageTypeSlug: "module",
  slug: "secret-saying",
  definition: "the Secret one resource's pages hold, said as yaml for kubectl to apply",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The yaml is said rather than applied, so what applies it is kubectl.",
    },
    {
      invariantKind: "departure",
      statement: "A resource holds the keys every page placing a value in it names.",
    },
    {
      invariantKind: "departure",
      statement: "The keys are said in one order, so a resource unchanged says the same bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A resource no page places a value in is refused rather than said empty.",
    },
    {
      invariantKind: "departure",
      statement: "A resource's type is said as given, and as Opaque where none is given.",
    },
    {
      invariantKind: "constraint",
      statement: "The type a Secret is on the cluster cannot be changed once that Secret is there.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages placing a value in one resource at one key are refused here too.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the cluster.",
    },
  ],
} as const satisfies Module
