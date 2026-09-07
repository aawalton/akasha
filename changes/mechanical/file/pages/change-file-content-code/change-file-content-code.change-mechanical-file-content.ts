import type { ChangeMechanicalFileContent } from "../../../file-content/change-mechanical-file-content.page-type.ts"

export const changeFileContentCode = {
  id: "01a079ac-d401-7d7b-aa1f-45743f81cf73",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-file-content-code",
  changeModeSlug: "change-mode-change",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/code",
  definition: "one passage of one code body replaced, with the imports that body names judged",
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
      statement: "The passage is worked by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement:
        "The imports the body names after the change are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path a passage is worked at.",
    },
  ],
} as const satisfies ChangeMechanicalFileContent
