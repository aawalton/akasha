import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLimbo = {
  id: "019ea4ab-a01d-7b2b-aff4-0830ce94195e",
  type: "page-type/song",
  slug: "billie-eilish-limbo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "da723e82-4050-4c35-be55-5ad2f1626ed2",
      externalLink: "https://musicbrainz.org/work/da723e82-4050-4c35-be55-5ad2f1626ed2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Limbo",
  artist: "artist/billie-eilish",
  performed: true,
  written: "collab",
} as const satisfies Song
