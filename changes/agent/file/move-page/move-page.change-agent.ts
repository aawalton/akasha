import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const movePage = {
  id: "01a07883-67ee-7249-9045-121a02fac4bf",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "move-page",
  changeMode: "change-mode-move",
  definition: "one page and the files beside that page moved into another folder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page moved into another folder keeps the slug that page had.",
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
      statement: "A folder already with a body at a path the move would write is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      invariantKind: "departure",
      statement: "The move is left to the mechanical change moving that kind of page.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
