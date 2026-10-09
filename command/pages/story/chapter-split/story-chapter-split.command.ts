import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyChapterSplit = {
  id: "01a11e27-6965-7ec9-8488-9f10a67dd3fe",
  type: "page-type/command",
  slug: "story-chapter-split",
  definition: "the command parting a read chapter's prose into beats beside that chapter",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read chapter's beats hold its prose byte for byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The beats' prose joined end to end is the chapter's prose file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat begins at a paragraph and runs to where the next beat begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The blank lines and scene marks after a beat's last paragraph are that beat's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new beat begins at each of the author's scene breaks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scene break is a line holding nothing but two or more dashes, stars, rules or bullets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene past five hundred words is parted at its paragraphs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat reaches past five hundred words only where one paragraph does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No paragraph is parted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's event is the first sentence of its first paragraph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event past 160 characters is cut at a word and ends in an ellipsis.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No model reads the chapter to name its events.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter that already keeps beats is refused, and its beats are left as they are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapter's page states its beats file in the landing that adds the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run parts one chapter.",
    },
  ],
  name: "chapter-split",
  arguments: [{ argument: "argument/read-chapter", required: true, saidAs: "flag-or-word" }],
  createdAt: "2026-10-09T00:54:21.796Z",
  updatedAt: "2026-10-09T00:54:21.796Z",
} as const satisfies Command
