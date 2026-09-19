import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorForeverMyLove = {
  id: "01a0b72f-21d1-7ddf-872b-28b9f3f43e46",
  type: "page-type/song",
  slug: "james-taylor-forever-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "22cdc526-f6c7-4412-85a0-168ca6a78549",
      externalLink: "https://musicbrainz.org/work/22cdc526-f6c7-4412-85a0-168ca6a78549",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Forever My Love",
  artist: "artist/james-taylor",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
