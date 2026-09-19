import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDandelion = {
  id: "019ea4e3-efdb-7202-95e7-23d0f4866804",
  type: "page-type/song",
  slug: "ariana-grande-dandelion",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed7e1ac0-10eb-47cd-9ea5-ded05b629991",
      externalLink: "https://musicbrainz.org/work/ed7e1ac0-10eb-47cd-9ea5-ded05b629991",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "dandelion",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
