import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBrandNewCity = {
  id: "019f0e9f-1461-7019-beea-50390af32b0c",
  type: "page-type/song",
  slug: "mitski-brand-new-city",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e0483f2-fe06-47d0-b526-8618d17e83c5",
      externalLink: "https://musicbrainz.org/work/3e0483f2-fe06-47d0-b526-8618d17e83c5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brand New City",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
