import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changeFileContentCode = {
  id: "01a079ac-d401-7d7b-aa1f-45743f81cf73",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "change-file-content-code",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one passage of one code body replaced, with the imports that body names judged",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-reaches-a-file"],
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
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
