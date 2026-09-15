import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const movePage = {
  id: "01a07883-67ee-7249-9045-121a02fac4bf",
  type: "page-type/change-agent",
  slug: "move-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page and the files beside that page moved into another folder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page moved into another folder keeps the slug that page had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file a page keeps beside that page moves with the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder already with a body at a path the move would write is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The move is left to the mechanical change moving that kind of page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
