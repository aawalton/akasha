import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloCarolinaRua = {
  id: "01a0abea-6a63-764d-91c9-fe7032360c3a",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-carolina-rua",
  ownLength: 2.834766666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5P7JsyPiiD6c3zP4YqvoDn",
      externalLink: "https://open.spotify.com/track/5P7JsyPiiD6c3zP4YqvoDn",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Carolina Rua",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "77xijq3ky5eW45DosksSNb", artistName: "Lynn Hillary" }],
  trackKey: "carolinarua|77xijq3ky5eW45DosksSNb|170086",
  song: "song/celtic-woman-carolina-rua",
} as const satisfies Track
