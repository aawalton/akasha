import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nightlyChapterWriting = {
  id: "01a0e99c-93f3-767d-b0a3-36689dd14810",
  type: "page-type/module",
  slug: "nightly-chapter-writing",
  definition:
    "the next chapter of each followed written story below its backlog of unread chapters",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story written is followed where the story states it is following.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter is published where the chapter is at the player or states no step status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is read where the chapter states the moment it was completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A followed story with fewer published unread chapters than its backlog is due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story due has its next chapter started, one chapter a run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating no backlog has a backlog of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with a chapter mid-step or naming no coordinator agent is skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every trigger starting a story's next chapter runs this one rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule runs nightly over every story, and over one story on demand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no chapter has every chapter read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is started as the chapter-write command starts it, by the same module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each story written is said with the chapter started or why none was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dry run says which stories would have a chapter started and starts none.",
    },
  ],
} as const satisfies Module
