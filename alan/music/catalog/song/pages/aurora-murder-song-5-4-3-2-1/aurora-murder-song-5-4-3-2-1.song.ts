import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMurderSong54321 = {
  id: "019ea4a6-c8e8-76c6-b113-d158f2b49bf6",
  type: "page-type/song",
  slug: "aurora-murder-song-5-4-3-2-1",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be4abc7b-528d-4974-bc3a-dc777834edf4",
      externalLink: "https://musicbrainz.org/work/be4abc7b-528d-4974-bc3a-dc777834edf4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Murder Song (5, 4, 3, 2, 1)",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
