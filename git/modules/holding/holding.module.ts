import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const holding = {
  id: "01a04df0-eccd-725e-9745-6888f36628bf",
  type: "page-type/module",
  slug: "holding",
  definition: "the hold a landing takes over a checkout while it judges, writes and commits",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold is one file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the hold is one create that fails if the hold is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold sits under `.git`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The hold names the process that took the hold and the moment that process started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold left by a process that is gone is taken rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hold naming no holder that can be read is taken once the hold has been there too long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold is released however the act inside the hold ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold is released only by the process whose mark is in the have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller that never took the hold is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller that never took the hold never has its act run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The longest a caller waits for the hold is named for another caller to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The words a wait that ran out is known by are worded here rather than by a caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait that ran out is thrown as a kind of its own rather than as a plain error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller asking for a refusal is answered a wait that ran out as a refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal states the code an operational fault exits with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act that failed inside the hold is thrown on rather than answered as a refusal.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Two landings over one worktree never overlap.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Nothing New In The Hold",
      act: "Ask Alan before putting any further work inside the hold.",
      warrant: "Every landing waits on the hold, so work put there is paid by every agent landing.",
      aids: [
        "Carrying work out of the hold is not putting work in.",
        "A mend that only works inside the hold is a mend to put to Alan.",
        "Reading inside the hold is work inside the hold.",
      ],
    },
  ],
} as const satisfies Module
