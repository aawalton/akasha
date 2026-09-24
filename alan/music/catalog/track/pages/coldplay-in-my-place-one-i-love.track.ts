import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayInMyPlaceOneILove = {
  id: "01a0b9ef-01bf-7003-933c-e85031aec2b8",
  type: "page-type/track",
  slug: "coldplay-in-my-place-one-i-love",
  ownLength: 4.587766666666667,
  ownProgress: 4.587766666666667,
  partOfCollections: ["release/coldplay-in-my-place"],
  status: "completed",
  unit: "unit/minutes",
  title: "One I Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "oneilove|4gzpq5DPGxSnKTe4SA8HAU|275266",
  song: "song/coldplay-one-i-love",
  carriedBy: [
    {
      release: "release/coldplay-in-my-place",
      discNumber: 1,
      position: 2,
      externalId: "5YahO7aySL2lyj6DW2tS9q",
      externalLink: "https://open.spotify.com/track/5YahO7aySL2lyj6DW2tS9q",
    },
  ],
} as const satisfies Track
