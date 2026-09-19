import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiMeAndMyHusband = {
  id: "019f0ea5-4147-7a28-8f77-ff8e1ad6d708",
  type: "page-type/song",
  slug: "mitski-me-and-my-husband",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b4dd6bd5-c2d6-45c1-ad96-86942897745e",
      externalLink: "https://musicbrainz.org/work/b4dd6bd5-c2d6-45c1-ad96-86942897745e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Me and My Husband",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
