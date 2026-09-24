import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversOnBroadway = {
  id: "01a0abeb-34cb-75a2-87d6-29808d3a696e",
  type: "page-type/track",
  slug: "james-taylor-2-covers-on-broadway",
  ownLength: 4.189333333333333,
  ownProgress: 4.189333333333333,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "On Broadway",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "onbroadway|0vn7UBvSQECKJm2817Yf1P|251360",
  song: "song/james-taylor-on-broadway",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 10,
      externalId: "1ts4gAyAd4pLMJDdwp9wCS",
      externalLink: "https://open.spotify.com/track/1ts4gAyAd4pLMJDdwp9wCS",
    },
  ],
} as const satisfies Track
