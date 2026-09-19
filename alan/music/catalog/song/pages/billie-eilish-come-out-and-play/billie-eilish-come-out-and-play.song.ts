import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishComeOutAndPlay = {
  id: "019ea4a8-bf88-70a9-bb89-d86f5f077971",
  type: "page-type/song",
  slug: "billie-eilish-come-out-and-play",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ad3135e-8e2f-4f80-b98f-46574797695c",
      externalLink: "https://musicbrainz.org/work/2ad3135e-8e2f-4f80-b98f-46574797695c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "come out and play",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
