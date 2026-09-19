import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2MiseEireMiseEire = {
  id: "01a0abea-7c20-7b9a-aa05-d505a2364a01",
  type: "page-type/track",
  slug: "celtic-woman-2-mise-eire-mise-eire",
  ownLength: 3.8793333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-mise-eire"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "68usAuEXES4tMUhZsO5RcL",
      externalLink: "https://open.spotify.com/track/68usAuEXES4tMUhZsO5RcL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Mise Éire",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "miseeire|6NWtt9pNOL2Gx7kBykdE5x|232760",
  song: "song/celtic-woman-mise-eire",
} as const satisfies Track
