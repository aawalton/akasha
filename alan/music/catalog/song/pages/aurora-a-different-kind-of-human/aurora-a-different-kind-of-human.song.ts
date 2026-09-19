import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraADifferentKindOfHuman = {
  id: "019ea4a7-b727-7264-acc8-a2c20602e65c",
  type: "page-type/song",
  slug: "aurora-a-different-kind-of-human",
  rank: "A+",
  tags: ["autism"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fd16913a-e4c6-4168-bbd4-7ecb73342cb0",
      externalLink: "https://musicbrainz.org/work/fd16913a-e4c6-4168-bbd4-7ecb73342cb0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Different Kind of Human",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "C",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
