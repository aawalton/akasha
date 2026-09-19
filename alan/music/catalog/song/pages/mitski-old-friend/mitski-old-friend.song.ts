import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiOldFriend = {
  id: "019f0e9f-b61e-7c18-9e72-33b086ec67f5",
  type: "page-type/song",
  slug: "mitski-old-friend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4795e634-8335-4978-948f-ea4dd8f0e520",
      externalLink: "https://musicbrainz.org/work/4795e634-8335-4978-948f-ea4dd8f0e520",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Old Friend",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
