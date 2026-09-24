import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3GhostRainyDayWaltz = {
  id: "01a0afa1-fbec-7c17-9f71-242d647aaefb",
  type: "page-type/track",
  slug: "the-piano-guys-3-ghost-rainy-day-waltz",
  ownLength: 3.7321166666666667,
  ownProgress: 3.7321166666666667,
  partOfCollections: [
    "release/the-piano-guys-3-ghost",
    "release/the-piano-guys-classical-for-studying",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Rainy Day Waltz",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "rainydaywaltz|0jW6R8CVyVohuUJVcuweDI|223927",
  song: "song/the-piano-guys-rainy-day-waltz",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-ghost",
      discNumber: 1,
      position: 2,
      externalId: "59ihFAedQDTHRbpzSZRr7f",
      externalLink: "https://open.spotify.com/track/59ihFAedQDTHRbpzSZRr7f",
    },
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 10,
      externalId: "687mPrGeQeTVZmN9BGXfDi",
      externalLink: "https://open.spotify.com/track/687mPrGeQeTVZmN9BGXfDi",
    },
  ],
} as const satisfies Track
