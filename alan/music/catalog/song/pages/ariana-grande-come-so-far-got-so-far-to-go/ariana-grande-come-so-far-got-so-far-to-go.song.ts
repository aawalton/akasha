import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeComeSoFarGotSoFarToGo = {
  id: "019ea4e2-3a1e-7903-be17-4c33a992a3f9",
  type: "page-type/song",
  slug: "ariana-grande-come-so-far-got-so-far-to-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "889afbb5-32a2-3e51-a4dc-f56db21b5f0d",
      externalLink: "https://musicbrainz.org/work/889afbb5-32a2-3e51-a4dc-f56db21b5f0d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Come So Far (Got So Far to Go)",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
