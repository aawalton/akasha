import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardTheNearnessOfYou = {
  id: "01a0abeb-2ece-7da7-806d-d0ef1535a296",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-the-nearness-of-you",
  ownLength: 3.8724333333333334,
  ownProgress: 3.8724333333333334,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Nearness Of You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "thenearnessofyou|0vn7UBvSQECKJm2817Yf1P|232346",
  song: "song/james-taylor-the-nearness-of-you",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 7,
      externalId: "2bIzGu5WuGhhH1d5hU5Rmh",
      externalLink: "https://open.spotify.com/track/2bIzGu5WuGhhH1d5hU5Rmh",
    },
  ],
} as const satisfies Track
