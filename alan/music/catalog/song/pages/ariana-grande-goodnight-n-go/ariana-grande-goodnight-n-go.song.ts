import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGoodnightNGo = {
  id: "019ea4e0-6f2d-721e-9df6-efde5eaf0329",
  type: "page-type/song",
  slug: "ariana-grande-goodnight-n-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e025544-5997-43b9-8dfc-7d85815a9725",
      externalLink: "https://musicbrainz.org/work/0e025544-5997-43b9-8dfc-7d85815a9725",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "goodnight n go",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
