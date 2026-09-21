import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const eppieMusicImprovements = {
  id: "01a0c430-3f69-7205-aa28-81d030972f66",
  type: "page-type/initiative",
  slug: "eppie-music-improvements",
  domain: "domain/music",
  persona: "persona/eppie",
  intentStack: [
    {
      statement: "A grade Alan reads in music wears the color its rung is given.",
      workingMemory:
        "`page/grade-property/grade-property.page-type.ts` states the sixteen rungs and a color for each, red at `F` through purple at `S`. Nimue's counsel is to read `optionColors` off the shape rather than off that page: `POST /shape` with a page type slug answers it on the `grade` declaration already resolved, so music needs no second mapping. The colors are `color/` addresses and the hex is on each color page. `akasha music artist-list` prints a grade per artist and a rung histogram as plain lines.",
    },
  ],
} as const satisfies Initiative
