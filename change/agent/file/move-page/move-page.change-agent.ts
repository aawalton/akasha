import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const movePage = {
  id: "01a07883-67ee-7249-9045-121a02fac4bf",
  type: "page-type/change-agent",
  slug: "move-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "a page and the files beside that page moved into another folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page moved into another folder keeps the slug that page had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file a page keeps beside that page moves with the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder already with a body at a path the move would write is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page file named where the folder belongs is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is left to the mechanical change moving that kind of page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
