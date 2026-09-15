import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIntro2 = {
  id: "019ea4e2-db05-7b9b-b946-446a2006187f",
  type: "page-type/song",
  slug: "ariana-grande-intro-2",
  title: "Intro",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba8eb016-2e5d-412b-8bd1-f1a7271c08cc",
      externalLink: "https://musicbrainz.org/work/ba8eb016-2e5d-412b-8bd1-f1a7271c08cc",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
