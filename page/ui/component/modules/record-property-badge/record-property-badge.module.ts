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
      statement: "A field holding a list its own badge does not draw is drawn one badge per item.",
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
      statement: "A card draws only the links the records hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card whose records hold no link draws the JSON badge.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No field drawn here is edited.",
    },
  ],
  createdAt: "2026-09-22T15:15:59.950Z",
  updatedAt: "2026-10-18T15:45:51.792Z",
} as const satisfies Module
