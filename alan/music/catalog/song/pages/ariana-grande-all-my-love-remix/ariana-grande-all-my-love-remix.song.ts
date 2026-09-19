import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAllMyLoveRemix = {
  id: "01a0ba8d-717f-7f24-bbc8-403a2b84ea2a",
  type: "page-type/song",
  slug: "ariana-grande-all-my-love-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7f3ba842-16ca-42d3-8d87-68f1606c5ae2",
      externalLink: "https://musicbrainz.org/work/7f3ba842-16ca-42d3-8d87-68f1606c5ae2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All My Love (remix)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
