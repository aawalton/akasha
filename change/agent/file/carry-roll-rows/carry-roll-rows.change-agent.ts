import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const carryRollRows = {
  id: "01a0c4ba-3957-7eb6-bf35-9bbc1c9d7114",
  type: "page-type/change-agent",
  slug: "carry-roll-rows",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "rows of an older roll log carried into the log of mechanics a game has run",
  code: "ts",
  temporary: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A carried row keeps the old row whole as what the mechanic was handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mechanic a row names is read from the fields that row already has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holding a mode is a strike, and one holding a difficulty is a check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row spending an attribute point is the levelling the game already has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each carried row follows the row before it by that row's hash.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is worked out again, so no carried row gains an answer it never had.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 60,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
