import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3IAinTWorriedCarmensLibertango = {
  id: "01a0afa1-ec85-7c02-a568-bfd5c7ff897b",
  type: "page-type/track",
  slug: "the-piano-guys-3-i-ain-t-worried-carmens-libertango",
  ownLength: 2.7695833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-i-ain-t-worried"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FglLUp4HsY9dVJQrRcNZF",
      externalLink: "https://open.spotify.com/track/2FglLUp4HsY9dVJQrRcNZF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Carmen's Libertango",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "carmenslibertango|0jW6R8CVyVohuUJVcuweDI|166175",
  song: "song/the-piano-guys-carmens-libertango",
} as const satisfies Track
