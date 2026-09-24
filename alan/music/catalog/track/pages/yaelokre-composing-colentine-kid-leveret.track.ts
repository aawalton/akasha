import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreComposingColentineKidLeveret = {
  id: "01a0ce87-1599-7f74-a542-bccfbd3a1632",
  type: "page-type/track",
  slug: "yaelokre-composing-colentine-kid-leveret",
  ownLength: 5.223416666666667,
  ownProgress: 5.223416666666667,
  partOfCollections: ["release/yaelokre-composing-colentine", "release/yaelokre-kid-leveret"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kid & Leveret",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }],
  trackKey: "kidleveret|3rRyfgGByetsaaujkjQ7rY|313405",
  song: "song/yaelokre-kid-leveret",
  carriedBy: [
    {
      release: "release/yaelokre-composing-colentine",
      discNumber: 1,
      position: 3,
      externalId: "0d4sJUNHYVcX1Ab7Hpf3Xb",
      externalLink: "https://open.spotify.com/track/0d4sJUNHYVcX1Ab7Hpf3Xb",
    },
    {
      release: "release/yaelokre-kid-leveret",
      discNumber: 1,
      position: 1,
      externalId: "4nguD9hn6U1NmQqssPA4kM",
      externalLink: "https://open.spotify.com/track/4nguD9hn6U1NmQqssPA4kM",
    },
  ],
} as const satisfies Track
