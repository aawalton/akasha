import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const chat = {
  id: "01a17ec7-f439-73e5-9f24-333750bfdeb7",
  type: "page-type/file-property",
  slug: "chat",
  propertySlug: "chat",
  definition: "what Alan and a story's game master said out of character, one message to a line",
  extensions: ["jsonl"],
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one message, as one json object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line states when the message was said as `at`, who said it as `from`, and `body`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line said by Alan is from `alan`, and a line answered is from the seat answering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chat is kept in the commit, beside the story the chat is of.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:13:15.832Z",
  updatedAt: "2026-10-27T19:13:15.832Z",
} as const satisfies FileProperty
