import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const addFilePageProperty = {
  id: "01a07984-2e7e-7ced-801b-160efbf7e220",
  pageTypeSlug: "change-mechanical",
  slug: "add-file-page-property",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-property",
  definition: "one page property written at one path, with the keys that property carries judged",
  code: "ts",
  test: "ts",
  readersOweReading: false,
  guardSlugs: ["change-guard/field-key-not-carried-twice"],
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
      statement: "The keys the property carries are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "The pages the body names are judged by the change this change reaches.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanical
