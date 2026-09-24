import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassAKissOfTheSunlight = {
  id: "01a0b4c8-6111-74f8-880e-4f53f4269f77",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-a-kiss-of-the-sunlight",
  ownLength: 3.8111,
  ownProgress: 3.8111,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Kiss Of The Sunlight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "akissofthesunlight|7FQRbf8gbKw8KZQZAJWxH2|228666",
  song: "song/paul-cardall-a-kiss-of-the-sunlight",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 7,
      externalId: "4ugj4jTTfq9hdSy61mzSEv",
      externalLink: "https://open.spotify.com/track/4ugj4jTTfq9hdSy61mzSEv",
    },
  ],
} as const satisfies Track
