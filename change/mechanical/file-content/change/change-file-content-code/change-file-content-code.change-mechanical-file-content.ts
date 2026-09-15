import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeFileContentCode = {
  id: "01a079ac-d401-7d7b-aa1f-45743f81cf73",
  type: "page-type/change-mechanical-file-content",
  slug: "change-file-content-code",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one passage of one code body replaced, with the imports that body names judged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under no TypeScript name is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passage is worked by the change this change reaches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the path a passage is worked at.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
