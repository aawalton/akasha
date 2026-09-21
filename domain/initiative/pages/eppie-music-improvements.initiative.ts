import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const eppieMusicImprovements = {
  id: "01a0c430-3f69-7205-aa28-81d030972f66",
  type: "page-type/initiative",
  slug: "eppie-music-improvements",
  domain: "domain/music",
  persona: "persona/eppie",
  intentStack: [
    {
      statement: "One recording is one track page, whatever releases carry that recording.",
      workingMemory:
        "Not started, and the largest of these. 4,059 track pages carry 3,358 recordings, so 701 are duplicates the `trackKey` machinery works around. Consolidating means a track naming many releases under `partOfCollections` rather than inverting the edge, because the collection rollup finds a release's parts by inverting it. Disc and position would move to a record per release, and `externalIdentity` would hold a Spotify id per release, which every reader calling `idFrom` would have to cope with.",
    },
    {
      statement:
        "A rating Alan gives is recorded against the track he heard rather than against a song.",
      workingMemory:
        "`akasha music rate` writes `grade` onto a track, a song or an artist, and a call naming no slug grades the track playing, so a grade already reaches the track Alan heard. One track page carries a grade today. The `rank` a collection carries is a second property nothing in music writes. Whether a song keeps a grade of its own, read off the tracks under it, is unsettled, and so is what a grade on a song or an artist means beside the grades on its tracks.",
    },
  ],
} as const satisfies Initiative
