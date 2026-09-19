import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionStateOfMind = {
  id: "01a0b4c8-45d5-70bd-9f2f-97f8ab325799",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-state-of-mind",
  ownLength: 4.196133333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HbJxW7MtgE7CcFtyOEsXl",
      externalLink: "https://open.spotify.com/track/7HbJxW7MtgE7CcFtyOEsXl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "State of Mind",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "stateofmind|7FQRbf8gbKw8KZQZAJWxH2|251768",
  song: "song/paul-cardall-state-of-mind",
} as const satisfies Track
