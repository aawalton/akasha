import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaUntitled = {
  id: "019ea4cc-3952-7fff-bf2e-b475371b24d1",
  type: "page-type/song",
  slug: "sia-untitled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c347449-57d8-4c8d-bae2-8052f6cdcd27",
      externalLink: "https://musicbrainz.org/work/4c347449-57d8-4c8d-bae2-8052f6cdcd27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "不要不要的",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
