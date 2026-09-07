import type { ChangeMechanicalFile } from "../../file/change-mechanical-file.page-type.ts"

export const addFileCode = {
  id: "01a07969-9123-7320-b8c9-3afd2dae9bfa",
  pageTypeSlug: "change-mechanical-file",
  slug: "add-file-code",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-code",
  definition: "one code body written at one path, with the imports that body names judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/import-reaches-a-file"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no TypeScript name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The imports the body names are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path a body is written at.",
    },
  ],
} as const satisfies ChangeMechanicalFile
