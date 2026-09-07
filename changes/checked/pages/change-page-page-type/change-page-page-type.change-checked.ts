import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const changePagePageType = {
  id: "01a07883-67ee-73cd-8370-4730fab7c87c",
  pageTypeSlug: "change-checked",
  slug: "change-page-page-type",
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
      invariantKind: "absence",
      statement: "Nothing here changes the slug a page states.",
    },
    {
      invariantKind: "departure",
      statement: "A guard runs over the answer before that answer comes back.",
    },
    {
      invariantKind: "gap",
      statement: "The guard run here is imported rather than reached through `guard-slugs`.",
    },
  ],
} as const satisfies ChangeChecked
