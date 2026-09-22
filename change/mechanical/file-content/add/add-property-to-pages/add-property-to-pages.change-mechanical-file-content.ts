import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const addPropertyToPages = {
  id: "01a0c66c-5c3f-7947-95c5-50580ca3f4ba",
  type: "page-type/change-mechanical-file-content",
  slug: "add-property-to-pages",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a value put under a key on each page named",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each page named takes a value of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is put in as the caller spells it rather than as text to quote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating the key already is refused rather than gaining a second value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page named twice is refused, because one page takes one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal over a page names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `after` the caller states places the key on every page named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads what the value means.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
