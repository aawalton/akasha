import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiYourBestAmericanGirl = {
  id: "019f0ea1-252b-75e6-8914-27ba7027411b",
  type: "page-type/song",
  slug: "mitski-your-best-american-girl",
  rank: "B+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "618e8a06-5fec-4c90-8dce-2a2e15bb3e19",
      externalLink: "https://musicbrainz.org/work/618e8a06-5fec-4c90-8dce-2a2e15bb3e19",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Best American Girl",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  singability: "B-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
