import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveSummerJamLive = {
  id: "01a0afa2-13de-7cf0-bd53-49068323a4d9",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-summer-jam-live",
  ownLength: 3.66955,
  ownProgress: 3.66955,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Summer Jam (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "summerjamlive|0jW6R8CVyVohuUJVcuweDI|220173",
  song: "song/the-piano-guys-summer-jam",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 8,
      externalId: "5eqn01HUwtVcyNS9MxULzW",
      externalLink: "https://open.spotify.com/track/5eqn01HUwtVcyNS9MxULzW",
    },
  ],
} as const satisfies Track
