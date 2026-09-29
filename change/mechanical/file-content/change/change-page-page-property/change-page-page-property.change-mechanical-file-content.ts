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
    {
      decisionKind: "decision-kind/departure",
      statement: "A key told to hold a number or a boolean is stated anew bare, as that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no such number or boolean is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key told no kind is stated anew as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place given names the value at that place in the list the key holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values around that value keep their order as the body had them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place no value sits at is refused with how many values the list holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names those values where the page the list sits on holds no lore.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value is named where the page holds lore.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key holding one value is refused where a place is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place not holding text is refused.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
