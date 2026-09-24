import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3FlickerFlicker = {
  id: "01a0afa2-1e2d-78b5-a6c7-d42e29d8a74b",
  type: "page-type/track",
  slug: "the-piano-guys-3-flicker-flicker",
  ownLength: 3.27555,
  ownProgress: 3.27555,
  partOfCollections: ["release/the-piano-guys-3-flicker", "release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Flicker",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "flicker|0jW6R8CVyVohuUJVcuweDI|196533",
  song: "song/the-piano-guys-flicker",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-flicker",
      discNumber: 1,
      position: 1,
      externalId: "4IOl3FjbQ5gOysdEXhJlV2",
      externalLink: "https://open.spotify.com/track/4IOl3FjbQ5gOysdEXhJlV2",
    },
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 10,
      externalId: "76vpjsz9JbD4qsSyVScMDq",
      externalLink: "https://open.spotify.com/track/76vpjsz9JbD4qsSyVScMDq",
    },
  ],
} as const satisfies Track
