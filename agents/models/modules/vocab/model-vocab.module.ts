import type { Module } from "@akasha/code-system/module"

export const modelVocab = {
  id: "01a06a01-258c-7517-820a-2362cf730b25",
  pageTypeSlug: "module",
  slug: "model-vocab",
  definition: "the names a model is called by, and the reading between them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A logical name is `fable` or `opus` or `sonnet` or `haiku`.",
    },
    {
      invariantKind: "departure",
      statement: "A logical name has one wire id.",
    },
    {
      invariantKind: "departure",
      statement: "A wire id has one logical name.",
    },
    {
      invariantKind: "departure",
      statement: "A wire id no longer served reads as the logical name that took its place.",
    },
    {
      invariantKind: "departure",
      statement: "A wire id no longer served is written by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "The extended-context marker is `[1m]`.",
    },
    {
      invariantKind: "departure",
      statement: "A raw name carries the marker at the end of the raw name or nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "The marker comes off a raw name before the rest of the raw name is read.",
    },
    {
      invariantKind: "departure",
      statement: "A raw name reads as a logical name or as a wire id.",
    },
    {
      invariantKind: "departure",
      statement: "A raw name naming no model reads as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A raw name that reads as nothing throws nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Blanks around a raw name come off before the raw name is read.",
    },
    {
      invariantKind: "departure",
      statement: "A raw name that is the marker alone reads as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Which logical names can carry extended context is named here.",
    },
    {
      invariantKind: "departure",
      statement: "A cli alias is a logical name.",
    },
    {
      invariantKind: "departure",
      statement: "A cli alias carries the marker only for a model that can carry the marker.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cli alias carries the marker only where the caller says extended context is to be had.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a gateway.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses which model work goes to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a model family page.",
    },
  ],
} as const satisfies Module
