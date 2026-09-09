import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changeFileContentPage = {
  id: "01a0826b-01da-7957-9cdb-c75c20bffe8b",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-file-content-page",
  changeMode: "change-mode-change",
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
      invariantKind: "departure",
      statement: "The passage is worked by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The imports the body names after the change are judged by the change reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages the body names after the change are judged by a guard this change names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The id and the slug the body states after the change are judged by a guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path a passage is worked at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
