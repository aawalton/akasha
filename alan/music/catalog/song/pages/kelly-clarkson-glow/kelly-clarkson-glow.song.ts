import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonGlow = {
  id: "019ea4b1-0e34-7372-a229-6383cd04f0bb",
  type: "page-type/song",
  slug: "kelly-clarkson-glow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f58bc2e0-185c-456d-b7b4-eb00f7d6b071",
      externalLink: "https://musicbrainz.org/work/f58bc2e0-185c-456d-b7b4-eb00f7d6b071",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Glow",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
