import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const addFilePageType = {
  id: "01a07984-8ef3-719a-972b-cb77ca7dafec",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "add-file-page-type",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition:
    "one page type written at one path, with the plural slug that page type states judged",
  code: "ts",
  test: "ts",
  guards: ["change-guard/plural-slug-not-already-held"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The plural slug the body states is judged by the guard this change names.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
