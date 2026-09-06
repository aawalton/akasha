import type { ChangeCommand } from "../../change-command.page-type.ts"

export const movePage = {
  id: "01a07883-67ee-7249-9045-121a02fac4bf",
  pageTypeSlug: "change-command",
  slug: "move-page",
  definition: "one page and the files beside that page carried into another folder",
  code: "ts",
  test: "ts",
  isCommand: true,
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page carried into another folder keeps the slug that page had.",
    },
    {
      invariantKind: "departure",
      statement: "Every file a page keeps beside that page moves with the page.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A folder already holding a body at a path the move would write is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the data a page states.",
    },
  ],
} as const satisfies ChangeCommand
