import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBitterSweetSymphony = {
  id: "01a0ba5d-4461-7d69-8fc6-32bc84e7dcb6",
  type: "page-type/song",
  slug: "coldplay-bitter-sweet-symphony",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b148c2ee-9575-3ef4-9b32-36cb7f59c2e9",
      externalLink: "https://musicbrainz.org/work/b148c2ee-9575-3ef4-9b32-36cb7f59c2e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bitter Sweet Symphony",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
