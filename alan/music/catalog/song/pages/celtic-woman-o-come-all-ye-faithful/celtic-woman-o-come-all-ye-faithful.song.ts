import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOComeAllYeFaithful = {
  id: "01a0b720-0c88-78ed-bdef-382cc988fb22",
  type: "page-type/song",
  slug: "celtic-woman-o-come-all-ye-faithful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57f86d53-3b74-3446-9bf4-4b73c678700d",
      externalLink: "https://musicbrainz.org/work/57f86d53-3b74-3446-9bf4-4b73c678700d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Come, All Ye Faithful",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
