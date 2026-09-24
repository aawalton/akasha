import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayStrawberrySwingStrawberrySwing = {
  id: "01a0b9ee-fa88-7788-bcb3-0ff4d7e0b620",
  type: "page-type/track",
  slug: "coldplay-strawberry-swing-strawberry-swing",
  ownLength: 4.1611,
  ownProgress: 4.1611,
  partOfCollections: [
    "release/coldplay-strawberry-swing",
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Strawberry Swing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "strawberryswing|4gzpq5DPGxSnKTe4SA8HAU|249666",
  song: "song/coldplay-strawberry-swing",
  carriedBy: [
    {
      release: "release/coldplay-strawberry-swing",
      discNumber: 1,
      position: 1,
      externalId: "06inBM2SUiyg3nGDC2KvUG",
      externalLink: "https://open.spotify.com/track/06inBM2SUiyg3nGDC2KvUG",
    },
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 9,
      externalId: "2dphvmoLEXdk8hOYxmHlI3",
      externalLink: "https://open.spotify.com/track/2dphvmoLEXdk8hOYxmHlI3",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 9,
      externalId: "4DLHhwZCJptTUCQPk6IAq8",
      externalLink: "https://open.spotify.com/track/4DLHhwZCJptTUCQPk6IAq8",
    },
  ],
} as const satisfies Track
