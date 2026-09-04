import type { Module } from "@akasha/code-system/module"

export const extendedContextModel = {
  id: "01a0643b-c940-7c40-9250-4804121e2d3c",
  pageTypeSlug: "module",
  slug: "extended-context-model",
  definition: "the extended-context marker on the model a request body names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The marker an extended-context model carries is `[1m]`.",
    },
    {
      invariantKind: "departure",
      statement: "A wire id ending in the marker is marked.",
    },
    {
      invariantKind: "departure",
      statement: "The marker anywhere but the end of a wire id marks nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The base sibling of a marked wire id is that id with the marker taken off.",
    },
    {
      invariantKind: "departure",
      statement: "The base sibling of an unmarked wire id is that id unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "Only the `model` key of a body decides whether extended context is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a model without the marker asks for no extended context.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming no model asks for no extended context.",
    },
    {
      invariantKind: "departure",
      statement: "An absent body asks for no extended context.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not parse as json asks for no extended context.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose model is no string asks for no extended context.",
    },
    {
      invariantKind: "departure",
      statement: "A rewrite carries every key the body holds beside the model.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a model without the marker is rewritten nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not parse as json is rewritten nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a response status.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names which models can carry extended context.",
    },
    {
      invariantKind: "gap",
      statement: "A model that is the marker alone is rewritten onto an empty model.",
    },
    {
      invariantKind: "gap",
      statement: "The marker is spelled here rather than read off `@akasha/agents/model-vocab`.",
    },
  ],
} as const satisfies Module
