import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changePagePageType = {
  id: "01a07883-67ee-73cd-8370-4730fab7c87c",
  type: "change-agent",
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
      statement:
        "Every file beside a page whose name carries the old page type states the new one instead.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose name a property fixes is left where that file is.",
    },
    {
      invariantKind: "departure",
      statement: "A name a property fixes is chosen outside akasha and carries no page type.",
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
    {
      invariantKind: "departure",
      statement: "The body states its new page type before any file beside that body is carried.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
