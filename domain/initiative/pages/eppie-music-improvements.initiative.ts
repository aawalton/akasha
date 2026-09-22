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
        "`music next` picks a track and answers its Spotify id and a `spotify:track:` uri `music play` takes. The catalogue is read from the track pages and the artist pages. A track's artist is the artist of the release carrying it, so a cover is the coverer's. A graded track is never offered again. Alan cleared every song grade, and nothing weighs one now. What is left: track pages name nine artists, so `next` can offer nothing by Taylor Swift, whom Alan graded `S`.",
    },
  ],
} as const satisfies Initiative
