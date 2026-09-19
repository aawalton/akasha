import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionWasatch = {
  id: "01a0b4c8-465d-7fce-bd66-0f66a9f57c64",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-wasatch",
  ownLength: 3.60925,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wxIiI84nGdKiahikYCuwy",
      externalLink: "https://open.spotify.com/track/0wxIiI84nGdKiahikYCuwy",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Wasatch",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wasatch|7FQRbf8gbKw8KZQZAJWxH2|216555",
  song: "song/paul-cardall-wasatch",
} as const satisfies Track
