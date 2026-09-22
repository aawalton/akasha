import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tmuxSession = {
  id: "01a0c9ed-0747-74e1-adb1-380621bd6c5d",
  type: "page-type/module",
  slug: "tmux-session",
  definition: "the tmux session a seat's name holds, read and ended",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is named by the seat's name and matched exactly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tmux call that does not answer within the ceiling is killed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session that was not there is ended as nothing rather than as an end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is read again after the kill to say whether the session ended.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a session.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
