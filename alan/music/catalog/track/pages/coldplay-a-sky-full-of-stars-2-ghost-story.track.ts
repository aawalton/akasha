import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2GhostStory = {
  id: "01a0b9ee-f691-76d1-8cfb-e3dbb9fa64f3",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-ghost-story",
  ownLength: 4.28955,
  ownProgress: 4.28955,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ghost Story",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "ghoststory|4gzpq5DPGxSnKTe4SA8HAU|257373",
  song: "song/coldplay-ghost-story",
  carriedBy: [
    {
      release: "release/coldplay-a-sky-full-of-stars-2",
      discNumber: 1,
      position: 3,
      externalId: "0VAQB7OYAoeRZH7sLmhVT6",
      externalLink: "https://open.spotify.com/track/0VAQB7OYAoeRZH7sLmhVT6",
    },
  ],
} as const satisfies Track
