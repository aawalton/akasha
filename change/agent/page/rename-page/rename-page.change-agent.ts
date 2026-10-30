import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renamePage = {
  id: "01a07718-c9b6-7e8c-bc13-5927529ac249",
  type: "page-type/change-agent",
  slug: "rename-page",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page",
  changeTargetSubtype: "change-target-subtype/page",
  definition: "a change that renames a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rename is left to the mechanical change renaming a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the change renaming a page type.",
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
  maxMemoryMb: 3072,
  createdAt: "2026-09-06T14:21:48.342Z",
  updatedAt: "2026-10-30T17:10:32.656Z",
} as const satisfies ChangeAgent
