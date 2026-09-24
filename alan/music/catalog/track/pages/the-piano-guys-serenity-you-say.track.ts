import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityYouSay = {
  id: "01a0afa2-0a29-753d-97ba-ae02f8ff37ad",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-you-say",
  ownLength: 5.17555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "You Say",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "yousay|0jW6R8CVyVohuUJVcuweDI|310533",
  song: "song/the-piano-guys-you-say",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 15,
      externalId: "0mkbbA9OZ9LW5WOUn7ZMaX",
      externalLink: "https://open.spotify.com/track/0mkbbA9OZ9LW5WOUn7ZMaX",
    },
  ],
} as const satisfies Track
