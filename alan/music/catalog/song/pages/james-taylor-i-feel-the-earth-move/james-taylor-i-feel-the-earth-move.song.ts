import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIFeelTheEarthMove = {
  id: "01a0b72f-24b6-77d2-ac85-842f8b1a41b5",
  type: "page-type/song",
  slug: "james-taylor-i-feel-the-earth-move",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "522f34e6-251e-3b26-9946-021a5ff501b6",
      externalLink: "https://musicbrainz.org/work/522f34e6-251e-3b26-9946-021a5ff501b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Feel the Earth Move",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
