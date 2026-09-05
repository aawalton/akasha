import type { Module } from "../../code-system/modules/module.page-type.ts"

export const statusBarPanel = {
  id: "01a06816-69fa-7001-a0ca-bd4a904571ee",
  pageTypeSlug: "module",
  slug: "status-bar-panel",
  definition: "the strip of readings Alan keeps in view, drawn from one file and on a click",
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
      statement: "The readings are read from the file the service writes rather than taken here.",
    },
    {
      invariantKind: "departure",
      statement: "The strip draws again when that file is written and at no other time.",
    },
    {
      invariantKind: "departure",
      statement: "A file the service has not written leaves the strip as that strip is.",
    },
    {
      invariantKind: "departure",
      statement: "A section the file says nothing for is drawn as a reading that failed.",
    },
    {
      invariantKind: "departure",
      statement: "A click reads the file again rather than waiting to be told it moved.",
    },
    {
      invariantKind: "departure",
      statement: "A section the file says nothing for keeps the labels that section last named.",
    },
    {
      invariantKind: "departure",
      statement: "A section carrying an empty legend keeps the labels that section last named.",
    },
    {
      invariantKind: "departure",
      statement: "The glyph row is read off the section the file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A drawing says which readings the file carried nothing for.",
    },
    {
      invariantKind: "departure",
      statement: "Every drawing's outcome is recorded as an observation.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here reads a stoplight or a usage figure.",
    },
  ],
} as const satisfies Module
