import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiZones = {
  id: "01a0d8fa-d068-753c-b7f2-eff94732d5fd",
  type: "page-type/module",
  slug: "sets-core-api-zones",
  definition: "whether a zone is a dungeon or a public dungeon, and what a zone is called",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which zones are dungeons and public dungeons is read off the set data table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone's name in the client's language is read off the game client.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone's name in another language is read off the zone library.",
    },
  ],
} as const satisfies Module
