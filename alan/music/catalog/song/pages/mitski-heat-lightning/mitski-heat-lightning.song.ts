import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiHeatLightning = {
  id: "019f0ea5-d22d-79b6-b27a-d20672f99010",
  type: "page-type/song",
  slug: "mitski-heat-lightning",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba674b24-940d-4674-8eba-3cd1ca645562",
      externalLink: "https://musicbrainz.org/work/ba674b24-940d-4674-8eba-3cd1ca645562",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heat Lightning",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
