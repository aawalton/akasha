import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAGriefObservedAGriefObserved = {
  id: "01a0b4c8-67fe-7686-a666-5f05e6663e40",
  type: "page-type/track",
  slug: "paul-cardall-a-grief-observed-a-grief-observed",
  ownLength: 3.9488166666666666,
  ownProgress: 3.9488166666666666,
  partOfCollections: [
    "release/paul-cardall-a-grief-observed",
    "release/paul-cardall-grace-in-grief",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Grief Observed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "agriefobserved|7FQRbf8gbKw8KZQZAJWxH2|236929",
  song: "song/paul-cardall-a-grief-observed",
  carriedBy: [
    {
      release: "release/paul-cardall-a-grief-observed",
      discNumber: 1,
      position: 1,
      externalId: "59TA85SubQlrlPYOvtq53u",
      externalLink: "https://open.spotify.com/track/59TA85SubQlrlPYOvtq53u",
    },
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 8,
      externalId: "2ndHSCDVY7VZi1KADiV3sU",
      externalLink: "https://open.spotify.com/track/2ndHSCDVY7VZi1KADiV3sU",
    },
  ],
} as const satisfies Track
