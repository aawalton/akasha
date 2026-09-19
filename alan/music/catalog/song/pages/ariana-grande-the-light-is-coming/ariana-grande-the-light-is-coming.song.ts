import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheLightIsComing = {
  id: "019ea4e6-512e-7711-b609-08b4725b2584",
  type: "page-type/song",
  slug: "ariana-grande-the-light-is-coming",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "88fdac53-4c71-4902-be67-54e1ed70910c",
      externalLink: "https://musicbrainz.org/work/88fdac53-4c71-4902-be67-54e1ed70910c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "the light is coming",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
