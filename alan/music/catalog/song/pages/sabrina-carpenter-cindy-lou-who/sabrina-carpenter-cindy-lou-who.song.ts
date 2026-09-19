import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterCindyLouWho = {
  id: "01a0b723-c1e0-7c11-9bba-22bbe2aa333d",
  type: "page-type/song",
  slug: "sabrina-carpenter-cindy-lou-who",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "278226fe-2a96-4da5-b91f-6624dfad5a72",
      externalLink: "https://musicbrainz.org/work/278226fe-2a96-4da5-b91f-6624dfad5a72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "cindy lou who",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
