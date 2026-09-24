import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresUntitled4 = {
  id: "01a0b9ee-ce37-7a89-9817-00f37e128eec",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-untitled-4",
  ownLength: 0.35646666666666665,
  ownProgress: 0.35646666666666665,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "🌎",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|21388",
  song: "song/coldplay-untitled-8",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 9,
      externalId: "0RbekAlUrwR6ZWJdwB3V4y",
      externalLink: "https://open.spotify.com/track/0RbekAlUrwR6ZWJdwB3V4y",
    },
  ],
} as const satisfies Track
