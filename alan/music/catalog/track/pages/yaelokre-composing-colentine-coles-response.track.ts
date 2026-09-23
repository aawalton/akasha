import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreComposingColentineColesResponse = {
  id: "01a0ce87-1571-7d93-97d0-5f09e7e94ee5",
  type: "page-type/track",
  slug: "yaelokre-composing-colentine-coles-response",
  ownLength: 2.14975,
  ownProgress: 2.14975,
  partOfCollections: ["release/yaelokre-composing-colentine", "release/yaelokre-cole-s-response"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cole's Response",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" }],
  trackKey: "colesresponse|3rRyfgGByetsaaujkjQ7rY|128985",
  song: "song/yaelokre-coles-response",
  carriedBy: [
    {
      release: "release/yaelokre-cole-s-response",
      discNumber: 1,
      position: 1,
      externalId: "51MMAFn3SJ5icMft2NwCG5",
      externalLink: "https://open.spotify.com/track/51MMAFn3SJ5icMft2NwCG5",
    },
    {
      release: "release/yaelokre-composing-colentine",
      discNumber: 1,
      position: 4,
      externalId: "0kKbDF54vvTdnUH3077Zxv",
      externalLink: "https://open.spotify.com/track/0kKbDF54vvTdnUH3077Zxv",
    },
  ],
} as const satisfies Track
