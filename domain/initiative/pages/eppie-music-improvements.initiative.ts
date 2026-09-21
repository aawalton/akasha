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
        "Not started. `akasha music rate` writes `rank` onto a song or an artist, and a track carries no rank at all. Alan hears a track, so a track is what he can rate. While one recording is still many track pages, a rating reaches every track sharing its key; once the pages are consolidated that falls away. Whether a song keeps a rank of its own, read off the tracks under it, is unsettled.",
    },
    {
      statement: "A second Spotify playlist holds the tracks Alan has heard and not rated.",
      workingMemory:
        "Not started. It runs beside `playlist/unheard`, which is now named New Tracks in Spotify and is reached by its id rather than its name. The picking is the mirror of the unheard one: heard, and carrying no rating. It waits on ratings reaching tracks, because nothing on a track says whether Alan rated it yet.",
    },
  ],
} as const satisfies Initiative
