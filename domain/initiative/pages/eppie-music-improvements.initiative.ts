import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const eppieMusicImprovements = {
  id: "01a0c430-3f69-7205-aa28-81d030972f66",
  type: "page-type/initiative",
  slug: "eppie-music-improvements",
  domain: "domain/music",
  persona: "persona/eppie",
  intentStack: [
    {
      statement: "What music chooses next is chosen out of the grades Alan actually gives.",
      workingMemory:
        "`music next` reads the catalogue from the song pages and the artist pages, and `music-exploration` weighs a grade off those. Grading moved onto tracks today: 71 tracks carry a grade against 42 songs, and every grade Alan gives now lands on a track. So the chooser is blind to most of what he says. Unsettled, and his to settle: whether `next` picks a track rather than a song, and how a track's grade bears on its song's, given he decided no grade a track carries is read up into the song.",
    },
  ],
} as const satisfies Initiative
