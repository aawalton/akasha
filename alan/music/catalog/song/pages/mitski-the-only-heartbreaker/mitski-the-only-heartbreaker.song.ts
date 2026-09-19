import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiTheOnlyHeartbreaker = {
  id: "019f0e9f-ed2e-77f6-8b23-292a33653ab8",
  type: "page-type/song",
  slug: "mitski-the-only-heartbreaker",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47bb0fd7-308b-4aff-99bb-031d59f867e9",
      externalLink: "https://musicbrainz.org/work/47bb0fd7-308b-4aff-99bb-031d59f867e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Only Heartbreaker",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
