import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPropertyRecord = {
  id: "01a081e6-5170-7f4a-b5df-d0846398305f",
  type: "page-type/change-agent",
  slug: "add-property-record",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a record put into a page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Putting the record in is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`after` is handed on where the caller states `after`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the caller states no `after`, the key the page's own type puts this one after is handed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No record put in is resolved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`after` is left out where the pages of this page's type write the key nowhere.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
