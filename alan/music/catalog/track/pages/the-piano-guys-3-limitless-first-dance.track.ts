import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessFirstDance = {
  id: "01a0afa2-0f63-70a3-9be9-8a5928d6a943",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-first-dance",
  ownLength: 4.60605,
  ownProgress: 4.60605,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "First Dance",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "firstdance|0jW6R8CVyVohuUJVcuweDI|276363",
  song: "song/the-piano-guys-first-dance",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 12,
      externalId: "0g7tfERffxAbZy6q1BmykR",
      externalLink: "https://open.spotify.com/track/0g7tfERffxAbZy6q1BmykR",
    },
  ],
} as const satisfies Track
