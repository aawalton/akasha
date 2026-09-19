import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaRadioactive = {
  id: "019ea4cd-2520-7386-ba53-bfa6a1f41e35",
  type: "page-type/song",
  slug: "sia-radioactive",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8d1af9cb-c508-4a6d-bb31-81455a1ed611",
      externalLink: "https://musicbrainz.org/work/8d1af9cb-c508-4a6d-bb31-81455a1ed611",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Radioactive",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
