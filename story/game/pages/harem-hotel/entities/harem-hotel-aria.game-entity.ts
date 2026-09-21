import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const haremHotelAria = {
  id: "01a0c662-f994-76e1-95eb-4d4e16c0a470",
  type: "page-type/game-entity",
  slug: "harem-hotel-aria",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "companion",
  class: "Storyteller",
  level: 2,
  attributes: [
    { attribute: "game-attribute/finesse", score: 13 },
    { attribute: "game-attribute/intellect", score: 16 },
    { attribute: "game-attribute/luck", score: 12 },
    { attribute: "game-attribute/might", score: 9 },
    { attribute: "game-attribute/perception", score: 15 },
    { attribute: "game-attribute/presence", score: 17 },
    { attribute: "game-attribute/vitality", score: 10 },
    { attribute: "game-attribute/will", score: 16 },
  ],
  skills: [
    {
      name: "Read the Table",
      progress: 11,
      effect:
        "Reads the true state of an encounter — who holds what, where the tension actually sits, what the next beat wants — the way a dungeon master reads a party. Engine hook: an assist that raises Alan's effective intent when she names a real opening he then exploits; grants no gate of its own.",
    },
    {
      name: "Set the Pace",
      progress: 8,
      effect:
        "Controls the tempo of an exchange — slows a rushed moment, holds a beat, quickens a stall. In combat: a support action that can delay or reposition the initiative order of allies who follow her lead. PRESENCE-driven.",
    },
  ],
  dice: "game-mechanic/one-d-twenty",
  revealGate: 0,
  note: "Ancient, warm, forward-without-grasping. Sensual the way silver dragons are romantic — always setting the pace, delighted when the person across the table volleys it back. The tease is hospitality; the control is care. — Silver dragon in human form — a dungeon master by vocation. Her 'class' is the craft of running a tale: pacing, reveal, the held breath before a roll.",
} as const satisfies GameEntity
