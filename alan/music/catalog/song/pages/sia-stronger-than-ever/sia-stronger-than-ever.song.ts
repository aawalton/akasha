import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaStrongerThanEver = {
  id: "019ea4cd-4598-7bab-95e7-e080ccccc47e",
  type: "page-type/song",
  slug: "sia-stronger-than-ever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a632bab-d935-4c57-8a7d-66e7fd50158a",
      externalLink: "https://musicbrainz.org/work/9a632bab-d935-4c57-8a7d-66e7fd50158a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stronger Than Ever",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
