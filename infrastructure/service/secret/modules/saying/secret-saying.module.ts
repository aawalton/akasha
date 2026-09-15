import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const secretSaying = {
  id: "01a07667-e09b-7f6e-bc84-5a76ea3566f4",
  type: "module",
  slug: "secret-saying",
  definition: "the values one resource's pages hold, said as yaml or handed over key by key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The same gathering of a resource's values serves the yaml and the handing over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The yaml is said rather than applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Kubectl applies the yaml.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource has the keys every page placing a value in it names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys are said in one order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource unchanged says the same bytes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource no page places a value in is refused rather than said empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource's type is said as given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource given no type is said as Opaque.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The type a Secret is on the cluster cannot be changed once that Secret is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource's labels are said as given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource given no label says no labels key at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A label's name runs up to the first `=`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A label's value runs from the first `=` on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry with no `=` is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two pages placing a value in one resource at one key are refused here too.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the cluster.",
    },
  ],
} as const satisfies Module
