import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const bodyLoading = {
  id: "01a09144-e05c-7d0e-996c-bbc555e3f9f7",
  type: "module",
  slug: "body-loading",
  definition: "the code at a module path, loaded from the body a change leaves there",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The body a change leaves at a path is that change's body only where the change carries that path.",
    },
    {
      invariantKind: "departure",
      statement: "The paths one change carries are read once for that change.",
    },
    {
      invariantKind: "departure",
      statement: "A path handed no body is loaded off the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A path handed a body is loaded from that body rather than off the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "That body is claimed at the one path rather than over a run of paths.",
    },
    {
      invariantKind: "departure",
      statement: "A path is claimed once however often a body is loaded at that path.",
    },
    {
      invariantKind: "departure",
      statement: "The body is dropped once the code is loaded from that body.",
    },
    {
      invariantKind: "departure",
      statement: "The module cache entry at that path is dropped before and after that load.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body handed in on a runtime holding no `Bun` global throws rather than loading the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Code that will not load throws rather than being said.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or an index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the code loaded answers to.",
    },
    {
      invariantKind: "gap",
      statement: "A module the code loaded here imports is loaded as the checkout has that module.",
    },
  ],
} as const satisfies Module
