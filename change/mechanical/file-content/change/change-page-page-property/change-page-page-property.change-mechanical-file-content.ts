import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changePagePageProperty = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  type: "page-type/change-mechanical-file-content",
  slug: "change-page-page-property",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The passage answered is the lines the key's value sits on rather than the body.",
    },
    {
      "decisionKind": "decision-kind/departure",
      "statement": "A newline ending the value asked for is dropped.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
