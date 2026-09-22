import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const addIfNotPresentFile = {
  id: "01a08188-1037-7ddd-b5cb-c727ac6ef590",
  type: "page-type/change-mechanical-file",
  slug: "add-if-not-present-file",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a body written at a path that does not have that body already",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a path as a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no body is written as an addition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path with another body is written over as a replace with the whole body each side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path already with the body given is left as that path is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body already there states no edit rather than a refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program folding many bodies together lands the bodies that moved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether a body may be written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller states under `old` the body that caller composed its body from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path holding a body other than `old` is refused rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller stating no `old` writes over whatever body is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path already holding the body given is left alone whatever `old` states.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
