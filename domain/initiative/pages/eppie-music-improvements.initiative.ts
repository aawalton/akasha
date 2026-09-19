import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const eppieMusicImprovements = {
  id: "01a0913d-13a5-7a7d-b7c4-f779d4059ebd",
  type: "page-type/initiative",
  slug: "eppie-music-improvements",
  domain: "domain/music",
  persona: "persona/eppie",
  intentStack: [
    {
      statement: "Every artist whose tracks Alan keeps has the songs of that artist filed.",
    },
    {
      statement: "Every track names the song that track is a recording of.",
    },
    {
      statement: "No song is a version of another song.",
    },
  ],
} as const satisfies Initiative
