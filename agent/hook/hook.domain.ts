import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const hook = {
  id: "01a04e0a-f8f9-7f51-97ed-edfe4be9ba2f",
  type: "page-type/domain",
  slug: "hook",
  definition: "code a Claude Code session event runs",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "hook" },
    { partOfSpeech: "part-of-speech/noun", spelling: "hooks" },
  ],
  parts: [
    "module/bun-calls",
    "module/chain-refusal",
    "module/git-calls",
    "module/hook-answer",
    "module/hook-dispatch",
    "module/hook-links",
    "module/lore-shell-reach",
    "module/path-showing",
    "module/settling",
    "module/shell-calls",
    "page-type/agent-hook",
    "test-fixture/hook-judging",
    "test-fixture/hook-payload",
    "module/dispatch-boot",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook is in the akasha folder and is registered outside the akasha folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook is registered by the name its page has rather than by its path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path that name reaches is worked out at the call rather than at the spawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook is TypeScript rather than a shell script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook that refuses names the akasha command that does the work asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook says the calls the hook does not catch when the hook is asked.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A hook over the ways a shell writes a file samples an open world that is too many ways to name.",
    },
  ],
} as const satisfies Domain
