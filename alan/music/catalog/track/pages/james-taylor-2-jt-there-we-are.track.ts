import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtThereWeAre = {
  id: "01a0abeb-45f3-7dcb-9cbf-569a2da184e1",
  type: "page-type/track",
  slug: "james-taylor-2-jt-there-we-are",
  ownLength: 3.0147166666666667,
  ownProgress: 3.0147166666666667,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "There We Are",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "thereweare|0vn7UBvSQECKJm2817Yf1P|180883",
  song: "song/james-taylor-there-we-are",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 2,
      externalId: "0riYVboaeTLyxByQccC80s",
      externalLink: "https://open.spotify.com/track/0riYVboaeTLyxByQccC80s",
    },
  ],
} as const satisfies Track
