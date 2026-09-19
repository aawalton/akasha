import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusIAintWorried = {
  id: "01a0afa1-c403-7cd7-9f14-a1df161ee514",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-i-aint-worried",
  ownLength: 2.66845,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TOFTlFa4FI3wnC873ra6U",
      externalLink: "https://open.spotify.com/track/6TOFTlFa4FI3wnC873ra6U",
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
