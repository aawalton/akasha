import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const addFileCode = {
  id: "01a07969-9123-7320-b8c9-3afd2dae9bfa",
  type: "change-mechanical",
  slug: "add-file-code",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "one code body written at one path, with the imports that body names judged",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-reaches-a-file"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The imports the body names are judged by the guard this change names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the path a body is written at.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
