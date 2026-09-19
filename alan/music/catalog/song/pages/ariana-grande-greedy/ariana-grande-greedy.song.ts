import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGreedy = {
  id: "019ea4e2-8420-7af1-a7cd-1c9d47ebd8cd",
  type: "page-type/song",
  slug: "ariana-grande-greedy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0341ff5-f817-43c0-84fc-bed2d6b63495",
      externalLink: "https://musicbrainz.org/work/a0341ff5-f817-43c0-84fc-bed2d6b63495",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Greedy",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
