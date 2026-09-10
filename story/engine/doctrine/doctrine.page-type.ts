import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const doctrine = {
  id: "01a0826f-8d12-7268-918c-0b3a3574d5f6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "doctrine",
  definition: "the rulings a game master runs every game by",
  pluralSlug: "doctrine",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "file-property/gate-dimensions",
    "file-property/policies",
    "file-property/sheet-template",
    "file-property/tally-catalog",
    "number-property/doctrine-version",
  ],
  properties: [
    { pageProperty: "number-property/doctrine-version", required: true, many: false },
    { pageProperty: "file-property/policies", required: false, many: false },
    { pageProperty: "file-property/gate-dimensions", required: false, many: false },
    { pageProperty: "file-property/sheet-template", required: false, many: false },
    { pageProperty: "file-property/tally-catalog", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The plural of doctrine is doctrine.",
    },
    {
      invariantKind: "departure",
      statement: "One doctrine is here at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A doctrine has the revision that doctrine is on.",
    },
    {
      invariantKind: "departure",
      statement: "Each part of a doctrine is a file beside the doctrine.",
    },
    {
      invariantKind: "departure",
      statement: "A reader loads only the part the reader asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The words a doctrine has are the game master's rather than akasha's own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
