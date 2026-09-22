import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addFilePropertyExtensions = {
  id: "01a09c81-eafc-7383-990d-72343c36051a",
  type: "page-type/change-mechanical-page-type",
  slug: "add-file-property-extensions",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every file property told the endings naming its files",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page whose value is held in a file is answered in this one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages acted on are every page property whose value is held in a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The endings stated are the ones the type beside that property already names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type that is no run of quoted endings is refused rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page stating its endings already is passed over rather than stating them twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run every page of which states its endings already is refused as no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The endings are written after the page's definition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page's endings come in by one edit over that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the type those endings make.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
