import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalReload = {
  id: "01a0680a-fa30-773e-a23e-fcd5bda782a7",
  type: "page-type/module",
  slug: "terminal-reload",
  definition: "the bounded reload a launcher runs over itself before it dispatches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A launcher is a name calling the reload and then the definition the reload left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A launcher's body sits under a name of its own rather than under the name typed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reload composes the whole set again rather than the one launcher that ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set is parsed before that set is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set that will not parse leaves the definitions the terminal started with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reload that could not be done says which step of that reload failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A launcher runs on the stale definition rather than not running.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says any one launcher's body.",
    },
  ],
} as const satisfies Module
