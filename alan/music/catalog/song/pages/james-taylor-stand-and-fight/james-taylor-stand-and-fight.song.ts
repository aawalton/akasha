import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorStandAndFight = {
  id: "01a0b72f-5334-7ceb-acc3-453a6442dbcc",
  type: "page-type/song",
  slug: "james-taylor-stand-and-fight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bafec923-d270-470e-b536-c924756a421d",
      externalLink: "https://musicbrainz.org/work/bafec923-d270-470e-b536-c924756a421d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stand and Fight",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
