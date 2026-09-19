import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDuHast = {
  id: "01a0ba5d-3dff-73e9-9aec-0c145f141e79",
  type: "page-type/song",
  slug: "coldplay-du-hast",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6340bf1c-3cb3-334a-ba36-58eb3c7d4866",
      externalLink: "https://musicbrainz.org/work/6340bf1c-3cb3-334a-ba36-58eb3c7d4866",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Du hast",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
