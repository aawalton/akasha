import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2Berlin = {
  id: "01a0afa2-205a-7a67-aa73-b417a8010159",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-berlin",
  ownLength: 4.008333333333334,
  ownProgress: 4.008333333333334,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Berlin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "berlin|0jW6R8CVyVohuUJVcuweDI|240500",
  song: "song/the-piano-guys-berlin",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 5,
      externalId: "155NjB8Mlcp47fM7t9el61",
      externalLink: "https://open.spotify.com/track/155NjB8Mlcp47fM7t9el61",
    },
  ],
} as const satisfies Track
