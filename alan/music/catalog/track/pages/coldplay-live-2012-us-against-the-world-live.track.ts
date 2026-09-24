import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012UsAgainstTheWorldLive = {
  id: "01a0b9ee-db3f-7094-8cf3-81fb72fe70c4",
  type: "page-type/track",
  slug: "coldplay-live-2012-us-against-the-world-live",
  ownLength: 3.87,
  ownProgress: 3.87,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Us Against the World - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "usagainsttheworldlive|4gzpq5DPGxSnKTe4SA8HAU|232200",
  song: "song/coldplay-us-against-the-world",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 12,
      externalId: "6i8gAfT84lsvS8R7ggDZKe",
      externalLink: "https://open.spotify.com/track/6i8gAfT84lsvS8R7ggDZKe",
    },
  ],
} as const satisfies Track
