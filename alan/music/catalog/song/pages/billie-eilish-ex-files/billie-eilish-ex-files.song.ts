import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishExFiles = {
  id: "019ea4aa-b1ad-7e16-8273-c5fbf4606f22",
  type: "page-type/song",
  slug: "billie-eilish-ex-files",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "96f7d5ad-db82-459d-b347-f51c43bf9209",
      externalLink: "https://musicbrainz.org/work/96f7d5ad-db82-459d-b347-f51c43bf9209",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ex files",
  artist: "artist/billie-eilish",
  performed: true,
  written: "collab",
} as const satisfies Song
