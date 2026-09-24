import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIAlmostLove = {
  id: "01a0b111-2612-788f-8708-c2b2de40d1cf",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-almost-love",
  ownLength: 3.5393333333333334,
  ownProgress: 3.5393333333333334,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "Almost Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "almostlove|74KM79TiuVKeVCqs8QtB0B|212360",
  song: "song/sabrina-carpenter-almost-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 1,
      externalId: "1yXFAwSMDZmX2ZyDLLyQ9s",
      externalLink: "https://open.spotify.com/track/1yXFAwSMDZmX2ZyDLLyQ9s",
    },
  ],
} as const satisfies Track
