import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoVoices = {
  id: "01a0b4c8-486d-728c-ad1f-9bd848382acc",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-voices",
  ownLength: 4.943333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0JuXdkOzxGNm9glbP1G60P",
      externalLink: "https://open.spotify.com/track/0JuXdkOzxGNm9glbP1G60P",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Voices",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "voices|7FQRbf8gbKw8KZQZAJWxH2|296600",
} as const satisfies Track
