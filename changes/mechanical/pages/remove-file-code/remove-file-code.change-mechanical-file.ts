import type { ChangeMechanicalFile } from "../../file/change-mechanical-file.page-type.ts"

export const removeFileCode = {
  id: "01a07987-afc1-73bf-8a8e-9ba1cc6c5248",
  pageTypeSlug: "change-mechanical-file",
  slug: "remove-file-code",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-code",
  definition: "one code file taken away, with the imports naming that file judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no TypeScript name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The file is taken away by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The imports naming the file are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path a file is taken away from.",
    },
  ],
} as const satisfies ChangeMechanicalFile
