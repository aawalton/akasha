import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellConfining = {
  id: "01a0d95f-cbdc-7199-83e5-3febc33764f7",
  type: "page-type/module",
  slug: "shell-confining",
  definition:
    "whether an agent's shell call runs outside the confinement keeping the checkout read-only",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An akasha call alone on the line runs outside, and no other call does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call alone on the line is `akasha` then bare words or single-quoted runs, and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read or a change the combined-calls hook approves is a call alone on the line, heredoc and all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An assignment before `akasha` keeps a call inside, since it can hand akasha a program.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call is read off the line the harness wraps it in, as lone-calling reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name a subagent's call is given is read past.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An akasha command runs outside whatever program that command runs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
