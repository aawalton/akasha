import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiRules = {
  id: "019f0ea0-70d4-79ce-9112-7973da822917",
  type: "page-type/song",
  slug: "mitski-rules",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50d50df4-9f89-41bf-857f-3cbc4c178aed",
      externalLink: "https://musicbrainz.org/work/50d50df4-9f89-41bf-857f-3cbc4c178aed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rules",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
