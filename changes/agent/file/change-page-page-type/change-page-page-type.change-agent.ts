import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const changePagePageType = {
  id: "01a07883-67ee-73cd-8370-4730fab7c87c",
  pageTypeSlug: "change-agent",
  slug: "change-page-page-type",
  changeModeSlug: "change-mode-change",
  definition: "one page stated as another page type, in the data and in every file name",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
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
      statement: "The type a page is declared to satisfy is imported from the new page type.",
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
} as const satisfies ChangeAgent
