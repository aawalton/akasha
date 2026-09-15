import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changePagePageType = {
  id: "01a07883-67ee-73cd-8370-4730fab7c87c",
  type: "change-agent",
  slug: "change-page-page-type",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page stated as another page type, in the data and in every file name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The retype is left to the mechanical change stating a page as another page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page and the page type it becomes are the two arguments read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type a page moves to is named by the path of that page type's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name a property fixes is chosen outside akasha and carries no page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
