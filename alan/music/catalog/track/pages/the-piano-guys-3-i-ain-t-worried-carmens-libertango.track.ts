import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3IAinTWorriedCarmensLibertango = {
  id: "01a0afa1-ec85-7c02-a568-bfd5c7ff897b",
  type: "page-type/track",
  slug: "the-piano-guys-3-i-ain-t-worried-carmens-libertango",
  ownLength: 2.7695833333333333,
  ownProgress: 2.7695833333333333,
  partOfCollections: [
    "release/the-piano-guys-3-i-ain-t-worried",
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Carmen's Libertango",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "carmenslibertango|0jW6R8CVyVohuUJVcuweDI|166175",
  song: "song/the-piano-guys-carmens-libertango",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-i-ain-t-worried",
      discNumber: 1,
      position: 2,
      externalId: "2FglLUp4HsY9dVJQrRcNZF",
      externalLink: "https://open.spotify.com/track/2FglLUp4HsY9dVJQrRcNZF",
    },
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 16,
      externalId: "6SzaEWfG0fTxDWVY3WL6t5",
      externalLink: "https://open.spotify.com/track/6SzaEWfG0fTxDWVY3WL6t5",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 15,
      externalId: "1RU6q7tbSBR3eppziMdkG8",
      externalLink: "https://open.spotify.com/track/1RU6q7tbSBR3eppziMdkG8",
    },
  ],
} as const satisfies Track
