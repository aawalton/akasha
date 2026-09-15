import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const addIfNotPresentFile = {
  id: "01a08188-1037-7ddd-b5cb-c727ac6ef590",
  type: "change-mechanical-file",
  slug: "add-if-not-present-file",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one body written at one path that does not have that body already",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a path as a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with no body is written as an addition.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path with another body is written over as a replace with the whole body each side.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path already with the body given is left as that path is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body already there states no edit rather than a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program folding many bodies together lands the bodies that moved.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether a body may be written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller states under `old` the body that caller composed its body from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path holding a body other than `old` is refused rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller stating no `old` writes over whatever body is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path already holding the body given is left alone whatever `old` states.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
