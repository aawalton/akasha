import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const addFilePageType = {
  id: "01a07984-8ef3-719a-972b-cb77ca7dafec",
  type: "change-mechanical",
  slug: "add-file-page-type",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition:
    "one page type written at one path, with the plural slug that page type states judged",
  code: "ts",
  test: "ts",
  guards: ["change-guard/plural-slug-not-already-held"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The plural slug the body states is judged by the guard this change names.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
