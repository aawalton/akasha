import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const withheldHiding = {
  id: "01a0da55-03dc-7c59-bcb3-3e9ac69a5b4e",
  type: "page-type/module",
  slug: "withheld-hiding",
  definition: "what code hides from the shell of a seat",
  code: "ts",
  test: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that is not a game master's is hidden nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent under a game master's seat is hidden what the seat is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A withheld page in the world of the seat's story reads as the refusal the hook gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other world holding a withheld page is emptied whole.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "bwrap refuses a call handed more than 9000 arguments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The git store is emptied, so no object, no history and no tree holding a copy is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Claude folders are emptied but for the shell snapshots, so no transcript is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The runtime folder is emptied whole, with the logs and ssh socket, and so are the tmux sockets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The network is taken away, so no local server answers a game master's shell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The home folder is read-only, so nothing is left there for a later call outside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The temp folders are emptied but for the seat's own session and the harness's folder file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A copy under another name outside the checkout, Claude's folders and the temps is not hidden.",
    },
  ],
  createdAt: "2026-09-25T20:49:59.772Z",
  updatedAt: "2026-10-19T19:39:28.372Z",
} as const satisfies Module
