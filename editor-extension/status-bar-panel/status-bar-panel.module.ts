import type { Module } from "../../code-system/modules/module.page-type.ts"

export const statusBarPanel = {
  id: "01a06816-69fa-7001-a0ca-bd4a904571ee",
  pageTypeSlug: "module",
  slug: "status-bar-panel",
  definition: "the strip of readings Alan keeps in view, refreshed on a poll and on a click",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every slot is made from the slot list in one pass.",
    },
    {
      invariantKind: "departure",
      statement: "A slot that is no separator carries the refresh command.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout root is named before any group is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "The four readings are taken within one call.",
    },
    {
      invariantKind: "departure",
      statement: "One read runs at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A trigger arriving mid-read waits for the read in flight.",
    },
    {
      invariantKind: "departure",
      statement: "A click answers with the reading in hand rather than taking the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A group that would not answer keeps the labels the group last named.",
    },
    {
      invariantKind: "departure",
      statement: "A group answering an empty legend keeps the labels the group last named.",
    },
    {
      invariantKind: "departure",
      statement: "The glyph row is read off the group's drawing.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh says which readings failed.",
    },
    {
      invariantKind: "departure",
      statement: "The refresh's outcome is recorded as an observation.",
    },
  ],
} as const satisfies Module
