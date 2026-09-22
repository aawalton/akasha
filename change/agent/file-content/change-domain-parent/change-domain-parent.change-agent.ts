import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changeDomainParent = {
  id: "01a0795e-9c4f-7299-9238-117baca6b57e",
  type: "page-type/change-agent",
  slug: "change-domain-parent",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a page made a part of another page rather than of the page naming it now",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reparenting is left to the mechanical change of that name.",
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
