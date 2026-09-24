import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AsItWasAsItWas = {
  id: "01a0afa1-ff23-70bd-b900-90585a978974",
  type: "page-type/track",
  slug: "the-piano-guys-3-as-it-was-as-it-was",
  ownLength: 2.6954,
  ownProgress: 2.6954,
  partOfCollections: [
    "release/the-piano-guys-3-as-it-was",
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "As It Was",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "asitwas|0jW6R8CVyVohuUJVcuweDI|161724",
  song: "song/the-piano-guys-as-it-was",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-as-it-was",
      discNumber: 1,
      position: 1,
      externalId: "71pz5tgYsXTUSvWDcswYSb",
      externalLink: "https://open.spotify.com/track/71pz5tgYsXTUSvWDcswYSb",
    },
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 2,
      externalId: "0dZR2mNYHcX0qJNl2bVgYH",
      externalLink: "https://open.spotify.com/track/0dZR2mNYHcX0qJNl2bVgYH",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 4,
      externalId: "2qqJwGoeDqqXJ9qQnxpzHZ",
      externalLink: "https://open.spotify.com/track/2qqJwGoeDqqXJ9qQnxpzHZ",
    },
  ],
} as const satisfies Track
