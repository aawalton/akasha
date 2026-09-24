import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const configClaiming = {
  id: "01a0d458-1065-78f1-b58b-808967038536",
  type: "page-type/module",
  slug: "config-claiming",
  definition: "the files the configs beside each lua runtime library name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lua runtime library is found by its page type and where the change leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each config beside a library's page names files by the patterns its include holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is read against the folder its config sits in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a config's exclude or files list.",
    },
  ],
} as const satisfies Module
