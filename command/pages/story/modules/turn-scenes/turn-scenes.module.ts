import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnScenes = {
  id: "01a10246-d64b-738f-a057-bb7eb2c39ee2",
  type: "page-type/module",
  slug: "turn-scenes",
  definition: "the game master's scenes of one turn or chapter, checked and cached as it advances",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's scenes replay on every earlier beat of its story, in position order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each earlier turn's beats and scenes are read from its own beats file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An earlier beats file that does not read refuses the replay, naming that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Scenes that would leave an impossible state refuse the advance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place or character a scene names is a page filed of its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A played turn whose scenes state a time caches its end time as the turn's end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each character the replay has placed caches its place on its own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mended turn's scenes correct the places its earlier run cached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats stating no scene check and cache nothing.",
    },
  ],
} as const satisfies Module
