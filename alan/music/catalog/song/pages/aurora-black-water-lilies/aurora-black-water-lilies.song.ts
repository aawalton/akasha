import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBlackWaterLilies = {
  id: "019ea4a6-7e48-736e-80fe-0d2712fae000",
  type: "page-type/song",
  slug: "aurora-black-water-lilies",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9851e89-d7af-47d2-a026-a461d1d441db",
      externalLink: "https://musicbrainz.org/work/a9851e89-d7af-47d2-a026-a461d1d441db",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Black Water Lilies",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
