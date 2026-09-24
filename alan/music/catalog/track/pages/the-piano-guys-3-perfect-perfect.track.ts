import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PerfectPerfect = {
  id: "01a0afa2-1e6b-7a26-af50-d469dba981ad",
  type: "page-type/track",
  slug: "the-piano-guys-3-perfect-perfect",
  ownLength: 5.179966666666667,
  ownProgress: 5.179966666666667,
  partOfCollections: ["release/the-piano-guys-3-perfect"],
  status: "completed",
  unit: "unit/minutes",
  title: "Perfect",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|310798",
  song: "song/the-piano-guys-perfect",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-perfect",
      discNumber: 1,
      position: 1,
      externalId: "2R0FW1n6cOkQDJhAkQENsf",
      externalLink: "https://open.spotify.com/track/2R0FW1n6cOkQDJhAkQENsf",
    },
  ],
} as const satisfies Track
