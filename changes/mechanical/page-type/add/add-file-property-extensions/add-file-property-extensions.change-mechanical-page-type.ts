import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addFilePropertyExtensions = {
  id: "01a09c81-eafc-7383-990d-72343c36051a",
  type: "change-mechanical-page-type",
  slug: "add-file-property-extensions",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every file property told the endings the files that property has are named with",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page whose value is held in a file is answered in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages acted on are every page property whose value is held in a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The endings stated are the ones the type beside that property already names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type that is no run of quoted endings is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page stating its endings already is passed over rather than stating them twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run every page of which states its endings already is refused as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The endings are written after the page's definition.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page's endings come in by one edit over that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the type those endings make.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
