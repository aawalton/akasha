import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const unlistPagesUnder = {
  id: "01a17ed1-d4e9-7be8-8119-26b76aad867c",
  type: "page-type/change-agent",
  slug: "unlist-pages-under",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition:
    "a change that removes the name of each page under a folder from every list outside that folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the names out is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run before taking a folder away leaves no list naming a page that goes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  createdAt: "2026-10-27T19:24:03.177Z",
  updatedAt: "2026-10-30T17:00:06.515Z",
} as const satisfies ChangeAgent
