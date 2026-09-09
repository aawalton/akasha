import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const changePagePageType = {
  id: "01a07883-67ee-73cd-8370-4730fab7c87c",
  pageTypeSlug: "change-agent",
  slug: "change-page-page-type",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page stated as another page type, in the data and in every file name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type a page moves to is named by the path of that page type's page.",
    },
    {
      invariantKind: "departure",
      statement: "Every file a page keeps beside that page states the new page type in its name.",
    },
    {
      invariantKind: "departure",
      statement: "A file stating no page type in its name is refused rather than left behind.",
    },
    {
      invariantKind: "departure",
      statement:
        "The body's page type and the type it satisfies are restated by the change this reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page is read for holding a body rather than for holding text.",
    },
    {
      invariantKind: "departure",
      statement: "An address the page type moves is restated wherever a body spells that address.",
    },
    {
      invariantKind: "departure",
      statement: "An address is restated before any file the page keeps beside it is carried.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the slug a page states.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
