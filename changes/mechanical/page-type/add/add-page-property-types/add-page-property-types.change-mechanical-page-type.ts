import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPagePropertyTypes = {
  id: "01a09c87-755c-70d2-9391-9da2c49bcb2b",
  type: "change-mechanical-page-type",
  slug: "add-page-property-types",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page property of one page type turned over to the code writing its type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page of that page type is answered in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type the properties are is the one argument.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type that is no page property is refused before any body is worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type no page is of is refused rather than answered as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page of that page type gains the key and hands its type on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file the type lands at is the `types` file beside the page property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type carried over is the one named for the page property's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A types file that is not there yet is written rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type leaves the page's own body, and every body naming it is repointed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating its type already is passed over rather than stating it twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run every page of which states its type already is refused as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each page's type is carried over the edits the pages before it left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
