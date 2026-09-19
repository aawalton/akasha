import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWhatAWonderfulWorld = {
  id: "01a0ba60-fd2e-73a6-821b-2663b62a1791",
  type: "page-type/song",
  slug: "coldplay-what-a-wonderful-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e7364956-ed0f-3fba-ae9a-d85faa558629",
      externalLink: "https://musicbrainz.org/work/e7364956-ed0f-3fba-ae9a-d85faa558629",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What a Wonderful World",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
