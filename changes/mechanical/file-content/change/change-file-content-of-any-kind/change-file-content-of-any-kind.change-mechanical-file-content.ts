import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.types.ts"

export const changeFileContentOfAnyKind = {
  id: "01a0826c-1190-79a9-aa7d-6eaf11dec403",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "change-file-content-of-any-kind",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  definition: "one passage of one body replaced, through the change working that kind of body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under a page name is worked by the change judging what that page states.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path is worked by the change judging the imports named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is worked by the change judging nothing beyond the passage.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a path for its kind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
