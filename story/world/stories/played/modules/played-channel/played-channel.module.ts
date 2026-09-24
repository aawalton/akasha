import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedChannel = {
  id: "01a0a162-9b05-7d36-a284-71c3ef40b6d7",
  type: "page-type/module",
  slug: "played-channel",
  definition: "the run play left a story, its turns of prose and the beats under them",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's system windows are drawn inside its prose where its game asks for that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ruled line marks the last turn play reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn arriving while the run is drawn is scrolled to, its ruled line at the top.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That ruled line is drawn once, so the beats under the run draw no line of their own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No count of the turns undrawn for want of room is drawn above the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose title is shown is followed by a link to the row's own page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No turn number is drawn, because a played turn's only title is its number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice confirmed here reaches the game master where the game names one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice confirmed here is refused where the game names no game master.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No session divider is drawn, because no played turn states a session.",
    },
  ],
} as const satisfies Module
