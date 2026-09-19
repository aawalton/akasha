import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorReadyToRun = {
  id: "01a0b72f-3f8c-7aca-92cd-50b0c6dc3362",
  type: "page-type/song",
  slug: "james-taylor-ready-to-run",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba944632-5223-4aab-9bc8-9760744467ce",
      externalLink: "https://musicbrainz.org/work/ba944632-5223-4aab-9bc8-9760744467ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ready to Run",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
