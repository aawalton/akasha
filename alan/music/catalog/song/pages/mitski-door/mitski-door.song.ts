import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiDoor = {
  id: "019f0ea6-af48-70b4-b893-2f5d475955fb",
  type: "page-type/song",
  slug: "mitski-door",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d49e9332-88ce-4bb2-80cb-5a430604ab23",
      externalLink: "https://musicbrainz.org/work/d49e9332-88ce-4bb2-80cb-5a430604ab23",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Door",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
