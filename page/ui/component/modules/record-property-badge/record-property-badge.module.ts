import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recordPropertyBadge = {
  id: "01a0c9b0-274e-730c-9885-7bdd5df18204",
  type: "page-type/module",
  slug: "record-property-badge",
  definition: "the badge a property holding named fields is shown as",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field is drawn as the badge of the property that field names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field is labelled by its own title beside that badge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field holding nothing is left out rather than drawn empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding a list of records draws each record under the one heading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose fields are unknown falls back to the JSON badge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card draws the JSON badge, because a card has room for a count alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No field drawn here is a link.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No field drawn here is edited.",
    },
  ],
} as const satisfies Module
