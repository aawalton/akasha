import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityPerfect = {
  id: "01a0afa2-0a07-7b00-905f-bc8f9d8d7640",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-perfect",
  ownLength: 5.141766666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Perfect",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|308506",
  song: "song/the-piano-guys-perfect",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 14,
      externalId: "3lKhN0698rFxwUYb0YlNj4",
      externalLink: "https://open.spotify.com/track/3lKhN0698rFxwUYb0YlNj4",
    },
  ],
} as const satisfies Track
