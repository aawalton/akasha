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
    "module/game-schema",
    "module/prose-windows",
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
} as const satisfies Domain
