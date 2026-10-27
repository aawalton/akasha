import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const storyEngineCore = {
  id: "01a05b71-e544-7ab9-87b3-b98dbd2ed891",
  type: "page-type/domain",
  slug: "story-engine-core",
  definition: "the shapes and the rules of an Awen game, shared by everything that runs one",
  parts: [
    "module/action-bar-message",
    "module/beat-schema",
    "module/chapter-words",
    "module/choice-action",
    "module/story-display",
    "module/prose-windows",
    "module/prose-paragraphs",
    "module/quest-schema",
    "module/revealed",
    "module/state-schema",
    "module/system-window-schema",
    "module/turn-package-schema",
    "module/word-count",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a database.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a model.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decision here is taken from facts handed in rather than from facts looked up.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.052Z",
  updatedAt: "2026-10-27T21:13:21.988Z",
} as const satisfies Domain
