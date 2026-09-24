import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveHowSweetItIs = {
  id: "01a0abeb-3d42-7018-abbb-0eb7ec0011b7",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-how-sweet-it-is",
  ownLength: 6.99555,
  ownProgress: 6.99555,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "How Sweet It Is",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "howsweetitis|0vn7UBvSQECKJm2817Yf1P|419733",
  song: "song/james-taylor-how-sweet-it-is",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 14,
      externalId: "4BiqtG2bW4JrNRd2T2mr0j",
      externalLink: "https://open.spotify.com/track/4BiqtG2bW4JrNRd2T2mr0j",
    },
  ],
} as const satisfies Track
