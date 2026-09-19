import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaFallenAngelFallenAngel = {
  id: "01a0aa7a-85c2-78fb-aea3-6e2a46ab2755",
  type: "page-type/track",
  slug: "alexandria-fallen-angel-fallen-angel",
  ownLength: 2.7624,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-fallen-angel"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3seBiwK70S9YrmolLWJiVp",
      externalLink: "https://open.spotify.com/track/3seBiwK70S9YrmolLWJiVp",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fallen Angel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "fallenangel|0SQG4wPVUlfbmbGQfqB47y|165744",
  song: "song/alexandria-fallen-angel",
} as const satisfies Track
