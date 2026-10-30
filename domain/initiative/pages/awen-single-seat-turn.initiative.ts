import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenSingleSeatTurn = {
  id: "01a18cae-feda-7c0a-83f8-2140719a1055",
  type: "page-type/initiative",
  slug: "awen-single-seat-turn",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "A played story can make each turn in one seat that follows a checklist.",
      workingMemory:
        "Alan: flatten the entire process into a single seat with that seat following a checklist, instead of passing between agents. Today a Gifted turn passes world-builder, game-master, then beats shared by the writer and the mechanics, memory and picture recorders, then four reviewers.",
    },
    {
      statement: "The checklist covers every step the seats cover now, from lore through review.",
    },
    {
      statement: "Which way a story makes its turns is one value on the story's page.",
    },
    {
      statement:
        "Each checklist step is timed, so a one-seat turn compares with a seat-graph turn.",
    },
    {
      statement: "Gifted: Reborn makes its turns in one seat.",
    },
    {
      statement: "A one-seat turn has no pictures step, and its picture recorder never runs.",
      workingMemory:
        "Alan: I'd like to drop pictures from the flow, and memory should happen after the full turn is returned to the player, its less critical with a single agent thread.",
    },
    {
      statement:
        "A one-seat turn's memory is one item for the whole turn, after it reaches player.",
      workingMemory:
        "Memory lands where it lands now. A next action sent while it is open waits for it to land, never skipping or racing it. It is timed apart from the turn's time to player.",
    },
    {
      statement: "A one-seat turn works the numbers of every beat, then the prose of every beat.",
      workingMemory:
        "Alan: for this version, it should do the numbers for all beats and then the prose for all beats, instead of alternating for each beat.",
    },
  ],
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
    "No turn is taken in gifted-reborn, which is Alan's real save; a clone played by agents tests it.",
    "Gifted: Reborn is switched only after a clone turn without pictures reaches player and its memory item lands.",
    "Alan's turn still shows its beats, outcome cards and prose as a seat-graph turn shows them.",
    "Alan has approved every directive this initiative needs to land.",
  ],
  createdAt: "2026-10-30T12:00:41.177Z",
  updatedAt: "2026-10-30T14:47:45.519Z",
} as const satisfies Initiative
