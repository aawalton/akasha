import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishSometimesTheyDo = {
  id: "019ea4a8-6a0c-7e2a-bf85-322da4b0346d",
  type: "page-type/song",
  slug: "billie-eilish-sometimes-they-do",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0f5c4876-f8aa-4ff3-83b0-73d486416289",
      externalLink: "https://musicbrainz.org/work/0f5c4876-f8aa-4ff3-83b0-73d486416289",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sometimes They Do",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
