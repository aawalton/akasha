import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelVocab = {
  id: "01a06a01-258c-7517-820a-2362cf730b25",
  type: "page-type/module",
  slug: "model-vocab",
  definition: "the names a model is called by, and the reading between them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A logical name is `fable` or `opus` or `sonnet` or `haiku`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A logical name has one wire id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wire id has one logical name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wire id no longer served reads as the logical name that took its place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wire id no longer served is written by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The extended-context marker is `[1m]`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A raw name has the marker at the end of the raw name or nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The marker comes off a raw name before the rest of the raw name is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A raw name reads as a logical name or as a wire id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A raw name naming no model reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A raw name that reads as nothing throws nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Blanks around a raw name come off before the raw name is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A raw name that is the marker alone reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which logical names can have extended context is named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cli alias is a logical name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cli alias has the marker only for a model that can have the marker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A cli alias has the marker only where the caller says extended context is to be had.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends a request.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names a gateway.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here chooses which model work goes to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a model family page.",
    },
  ],
} as const satisfies Module
