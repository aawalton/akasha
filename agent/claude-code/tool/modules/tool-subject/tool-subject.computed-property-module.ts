import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const toolSubject = {
  id: "01a0d449-33fb-78de-8beb-59f00d03ca31",
  type: "page-type/computed-property-module",
  slug: "tool-subject",
  definition: "the short text that shows what an agent sends to an agent tool",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool known here is named by the input field it acts on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another tool is named by the first text in its input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An input with no text is named by its first number or true or false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subject is one line of at most 200 characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An input that is no record has no subject.",
    },
  ],
  createdAt: "2026-09-24T16:39:22.363Z",
  updatedAt: "2026-09-25T17:58:09.000Z",
} as const satisfies ComputedPropertyModule
