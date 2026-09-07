import type { ChangeMechanicalFile } from "../../file/change-mechanical-file.page-type.ts"

export const addFilePageProperty = {
  id: "01a07984-2e7e-7ced-801b-160efbf7e220",
  pageTypeSlug: "change-mechanical-file",
  slug: "add-file-page-property",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-property",
  definition: "one page property written at one path, with the keys that property carries judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/field-key-not-carried-twice"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path that is no page property is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The property types a name is read against are the ones under `page-property`.",
    },
    {
      invariantKind: "departure",
      statement: "The body is written by the change this change reaches.",
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
} as const satisfies ChangeMechanicalFile
