import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiCrackBaby = {
  id: "019f0e9c-35fe-78f6-9a01-032695b07fe2",
  type: "page-type/song",
  slug: "mitski-crack-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0acff653-5352-4264-b53f-35755d47c160",
      externalLink: "https://musicbrainz.org/work/0acff653-5352-4264-b53f-35755d47c160",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crack Baby",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
