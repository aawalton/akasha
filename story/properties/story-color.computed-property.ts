import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const storyColor = {
  id: "01a0eafd-aac3-7d63-991e-1606a29f818b",
  type: "page-type/computed-property",
  slug: "story-color",
  propertySlug: "story-color",
  definition: "the color a story's title is drawn in",
  holds: "relation",
  targetPageType: "page-type/color",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's turns are the pages naming it under `part-of-collections`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's chapters are the pages naming it under `chapter-story`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn or the chapter read is the one of those sitting furthest along.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a chapter stating a step status is a chapter being made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's seats are the pages naming it under `assignment-slug`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step other than `player` is in flight while a seat of its story is `working`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step in flight is drawn in `color/green`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step no seat of its story is working draws no color, whatever its status says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at `player` waits on Alan's next action, drawn in `color/red`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter at `player` has published, so it draws no color.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No other state a story is in states a color.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
