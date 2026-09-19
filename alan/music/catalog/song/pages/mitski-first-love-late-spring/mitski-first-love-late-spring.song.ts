import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiFirstLoveLateSpring = {
  id: "019f0ea3-6500-7774-a1f1-561b0dcc4381",
  type: "page-type/song",
  slug: "mitski-first-love-late-spring",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8871bc41-a1ef-4682-bab4-b4637931b665",
      externalLink: "https://musicbrainz.org/work/8871bc41-a1ef-4682-bab4-b4637931b665",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "First Love / Late Spring",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
