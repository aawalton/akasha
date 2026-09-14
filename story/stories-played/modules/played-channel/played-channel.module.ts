import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const playedChannel = {
  id: "01a0a162-9b05-7d36-a284-71c3ef40b6d7",
  type: "module",
  slug: "played-channel",
  definition: "the run play left a story, its turns of prose and the beats under them",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn's system windows are drawn inside its prose where its game asks for that.",
    },
    {
      invariantKind: "departure",
      statement: "A ruled line marks the last turn play reached.",
    },
    {
      invariantKind: "departure",
      statement: "A turn undrawn for want of room is counted above the run.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is followed by a link to the turn's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A choice confirmed here is refused, because the play these turns are of is over.",
    },
    {
      invariantKind: "absence",
      statement: "No session divider is drawn, because no played turn states a session.",
    },
  ],
} as const satisfies Module
