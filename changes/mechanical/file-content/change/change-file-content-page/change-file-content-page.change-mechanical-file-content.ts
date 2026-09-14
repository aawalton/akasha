import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeFileContentPage = {
  id: "01a0826b-01da-7957-9cdb-c75c20bffe8b",
  type: "change-mechanical-file-content",
  slug: "change-file-content-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page",
  definition: "one passage of one page's body replaced, with what that page states judged",
  code: "ts",
  test: "ts",
  guards: [
    "change-guard/identity-not-already-held",
    "change-guard/relation-reaches-a-page",
    "change-guard/slug-names-one-property",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passage is worked by the change this change reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The imports the body names after the change are judged by the change reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages the body names after the change are judged by a guard this change names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The id and the slug the body states after the change are judged by a guard this change names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the path a passage is worked at.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
