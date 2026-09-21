import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationEdenZaDrugim = {
  id: "01a0b4c8-36dd-74af-967e-2994af7a5b7b",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-eden-za-drugim",
  ownLength: 3.34755,
  ownProgress: 3.34755,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5BBpKmVsywON8P1G7s564S",
      externalLink: "https://open.spotify.com/track/5BBpKmVsywON8P1G7s564S",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eden Za Drugim",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "edenzadrugim|7FQRbf8gbKw8KZQZAJWxH2|200853",
  song: "song/paul-cardall-eden-za-drugim",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 11,
      externalId: "5BBpKmVsywON8P1G7s564S",
      externalLink: "https://open.spotify.com/track/5BBpKmVsywON8P1G7s564S",
    },
  ],
} as const satisfies Track
