import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiInMyBed = {
  id: "01a0b111-24e9-7820-9137-e0d0cc847637",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-in-my-bed",
  ownLength: 3.166333333333333,
  ownProgress: 3.166333333333333,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Bed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "inmybed|74KM79TiuVKeVCqs8QtB0B|189980",
  song: "song/sabrina-carpenter-in-my-bed",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 1,
      externalId: "1FjD1jpm51dH5LzLvrDVPY",
      externalLink: "https://open.spotify.com/track/1FjD1jpm51dH5LzLvrDVPY",
    },
  ],
} as const satisfies Track
