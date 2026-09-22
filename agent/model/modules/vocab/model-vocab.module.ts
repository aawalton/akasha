import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelVocab = {
  id: "01a06a01-258c-7517-820a-2362cf730b25",
  type: "page-type/module",
  slug: "model-vocab",
  definition: "the names a model is called by, and the reading between them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A logical name is `fable` or `opus` or `sonnet` or `haiku`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A logical name has one wire id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wire id has one logical name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wire id no longer served is taken as the logical name that took its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wire id no longer served is written by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The extended-context marker is `[1m]`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raw name has the marker at the end of the raw name or nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The marker comes off a raw name before the rest of the raw name is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raw name reads as a logical name or as a wire id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raw name naming no model reads as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raw name taken as nothing throws nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Blanks around a raw name come off before the raw name is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raw name that is the marker alone reads as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which logical names can have extended context is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cli alias is a logical name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cli alias has the marker only for a model that can have the marker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cli alias has the marker only where the caller says extended context is to be had.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sends a request.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a gateway.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which model work goes to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a model family page.",
    },
  ],
} as const satisfies Module
