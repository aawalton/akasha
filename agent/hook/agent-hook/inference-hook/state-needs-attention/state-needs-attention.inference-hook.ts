import type { InferenceHook } from "akasha/agent/hook/agent-hook/inference-hook/inference-hook.page-type.types.ts"

export const stateNeedsAttention = {
  id: "01a0defe-943a-7168-9bfc-da5e99006474",
  type: "page-type/inference-hook",
  slug: "state-needs-attention",
  definition: "the hook that writes whether a seat's last turn asked Alan for something",
  code: "ts",
  test: "ts",
  runsAt: ["Stop", "UserPromptSubmit"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The words judged are the last the agent wrote, beside what the person last asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop held open before is judged as any other stop is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is judged apart from the stop, so the stop waits on no model.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every hook at an event shares one fifteen-second ceiling, and a judged stop spends eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn begun before the answer came is written nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt arriving clears it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn ending with a subagent or a background command still to report asks Alan for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat answering to no person asks Alan for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn no model call reached asks Alan for nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here refuses a call.",
    },
  ],
} as const satisfies InferenceHook
