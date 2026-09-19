import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3IAinTWorriedIAintWorried = {
  id: "01a0afa1-ec5f-7381-8af3-e5965d6af29c",
  type: "page-type/track",
  slug: "the-piano-guys-3-i-ain-t-worried-i-aint-worried",
  ownLength: 2.66845,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-i-ain-t-worried"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3IpSp0YzCKs5nGGZgrtQJV",
      externalLink: "https://open.spotify.com/track/3IpSp0YzCKs5nGGZgrtQJV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Ain't Worried",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "iaintworried|0jW6R8CVyVohuUJVcuweDI|160107",
  song: "song/the-piano-guys-i-aint-worried",
} as const satisfies Track
