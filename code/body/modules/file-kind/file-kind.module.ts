import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileKind = {
  id: "01a06553-a9b6-77a7-a681-f8ecbf29a0b3",
  type: "page-type/module",
  slug: "file-kind",
  definition: "the kind and the purpose of a file a path's own name says",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path's name alone says its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kinds are the file kind pages the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path is answered with the slug of the kind whose name pattern its name matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kinds are read from the checkout this code sits in, once in a process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path of the kind `ts` or `tsx` is TypeScript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a path is TypeScript is answered from its own name alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name no pattern matches and ending `.template` is read as the same name without that ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no pattern matches says no kind rather than a kind meaning unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The purposes are the file purpose pages the index names, read as the kinds are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path of the purpose `test-ts` or `test-tsx` is a test.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the file the path names.",
    },
  ],
} as const satisfies Module
