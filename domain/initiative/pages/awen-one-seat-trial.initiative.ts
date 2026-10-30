import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatTrial = {
  id: "01a18cb3-e515-7e28-a457-38758501b60a",
  type: "page-type/initiative",
  slug: "awen-one-seat-trial",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  intentStack: [
    {
      statement: "A clone of Gifted: Reborn makes a whole turn in one seat, seen signed in.",
    },
    {
      statement: "Gifted: Reborn makes its turns in one seat.",
    },
  ],
  constraints: [
    "No turn is taken, no message sent and nothing advanced in gifted-reborn, which is Alan's real save.",
    "Gifted: Reborn is switched only after the clone made a whole turn in one seat, by a change to its page alone, while it is at player.",
    "The clone is played by agents only, and is removed once the trial is done.",
    "A page is seen on alanwalton.com, never on atlas.alanwalton.com.",
  ],
  createdAt: "2026-10-30T12:06:02.259Z",
  updatedAt: "2026-10-30T12:06:02.259Z",
} as const satisfies Initiative
