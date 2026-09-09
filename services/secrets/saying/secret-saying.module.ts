import type { Module } from "@akasha/code/module"

export const secretSaying = {
  id: "01a07667-e09b-7f6e-bc84-5a76ea3566f4",
  pageTypeSlug: "module",
  slug: "secret-saying",
  definition: "the values one resource's pages hold, said as yaml or handed over key by key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The same gathering of a resource's values serves the yaml and the handing over.",
    },
    {
      invariantKind: "departure",
      statement: "The yaml is said rather than applied.",
    },
    {
      invariantKind: "departure",
      statement: "Kubectl applies the yaml.",
    },
    {
      invariantKind: "departure",
      statement: "A resource has the keys every page placing a value in it names.",
    },
    {
      invariantKind: "departure",
      statement: "The keys are said in one order.",
    },
    {
      invariantKind: "departure",
      statement: "A resource unchanged says the same bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A resource no page places a value in is refused rather than said empty.",
    },
    {
      invariantKind: "departure",
      statement: "A resource's type is said as given.",
    },
    {
      invariantKind: "departure",
      statement: "A resource given no type is said as Opaque.",
    },
    {
      invariantKind: "constraint",
      statement: "The type a Secret is on the cluster cannot be changed once that Secret is there.",
    },
    {
      invariantKind: "departure",
      statement: "A resource's labels are said as given.",
    },
    {
      invariantKind: "departure",
      statement: "A resource given no label says no labels key at all.",
    },
    {
      invariantKind: "departure",
      statement: "A label's name runs up to the first `=`.",
    },
    {
      invariantKind: "departure",
      statement: "A label's value runs from the first `=` on.",
    },
    {
      invariantKind: "departure",
      statement: "An entry with no `=` is refused rather than passed over.",
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
