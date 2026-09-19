import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBlueberries = {
  id: "01a0b723-c4f0-7283-b76d-077777278fd8",
  type: "page-type/song",
  slug: "sabrina-carpenter-blueberries",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4fbf09d1-b845-4cbd-8f24-c891852cb3f3",
      externalLink: "https://musicbrainz.org/work/4fbf09d1-b845-4cbd-8f24-c891852cb3f3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blueberries",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
