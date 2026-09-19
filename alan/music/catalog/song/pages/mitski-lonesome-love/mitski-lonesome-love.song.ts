import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiLonesomeLove = {
  id: "019f0ea2-9410-741a-b21b-34b0e593795e",
  type: "page-type/song",
  slug: "mitski-lonesome-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c8f44ca-e5cf-48a1-a3cc-5e14a7423500",
      externalLink: "https://musicbrainz.org/work/7c8f44ca-e5cf-48a1-a3cc-5e14a7423500",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lonesome Love",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
