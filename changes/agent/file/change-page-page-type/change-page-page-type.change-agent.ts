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
      statement: "The retype is left to the mechanical change stating a page as another page type.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "departure",
      statement: "The page and the page type it becomes are the two arguments read here.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a page moves to is named by the path of that page type's page.",
    },
    {
      invariantKind: "departure",
      statement: "A name a property fixes is chosen outside akasha and carries no page type.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a guard, the change reached naming the guards.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
