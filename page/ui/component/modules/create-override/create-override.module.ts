import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const createOverride = {
  id: "01a0c539-b9c3-7a0e-a228-f58993cf903e",
  type: "page-type/module",
  slug: "create-override",
  definition: "what an app puts in place of creating a page when a view's add button is pressed",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An app says which page types it opens its own way, keyed by page type slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type the app says nothing about is created the way every other one is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app naming none of these is the same as no app naming any.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What replaces creating decides for itself whether to open a dialog or write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view with an override draws its add button for a reader who could write no page there.",
    },
  ],
} as const satisfies Module
