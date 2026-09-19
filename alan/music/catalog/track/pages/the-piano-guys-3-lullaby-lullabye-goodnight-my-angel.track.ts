import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyLullabyeGoodnightMyAngel = {
  id: "01a0afa1-de9b-7340-b378-a4f931a54425",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-lullabye-goodnight-my-angel",
  ownLength: 3.229016666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7fOq6Qb9sDwtFi3RAAoETZ",
      externalLink: "https://open.spotify.com/track/7fOq6Qb9sDwtFi3RAAoETZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lullabye (Goodnight, My Angel)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lullabyegoodnightmyangel|0jW6R8CVyVohuUJVcuweDI|193741",
  song: "song/the-piano-guys-lullabye-goodnight-my-angel",
} as const satisfies Track
