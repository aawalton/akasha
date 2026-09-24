import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreKamahalanKamahalan = {
  id: "01a0ce87-1519-7784-89a4-a217e5b67479",
  type: "page-type/track",
  slug: "yaelokre-kamahalan-kamahalan",
  ownLength: 2.4706333333333332,
  ownProgress: 2.4706333333333332,
  partOfCollections: ["release/yaelokre-kamahalan", "release/yaelokre-origins"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kamahalan",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }],
  trackKey: "kamahalan|3rRyfgGByetsaaujkjQ7rY|148238",
  song: "song/yaelokre-kamahalan",
  carriedBy: [
    {
      release: "release/yaelokre-kamahalan",
      discNumber: 1,
      position: 1,
      externalId: "4sij1dF9D8W6jNpyeIA3eC",
      externalLink: "https://open.spotify.com/track/4sij1dF9D8W6jNpyeIA3eC",
    },
    {
      release: "release/yaelokre-origins",
      discNumber: 1,
      position: 4,
      externalId: "67GKPQ5HWrJClSCo06aTZ6",
      externalLink: "https://open.spotify.com/track/67GKPQ5HWrJClSCo06aTZ6",
    },
  ],
} as const satisfies Track
