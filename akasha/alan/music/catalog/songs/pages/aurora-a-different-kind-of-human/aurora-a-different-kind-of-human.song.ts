import type { Song } from "../../song.page-type.ts"

export const auroraADifferentKindOfHuman = {
  id: "019ea4a7-b727-7264-acc8-a2c20602e65c",
  pageTypeSlug: "song",
  slug: "aurora-a-different-kind-of-human",
  title: "A Different Kind of Human",
  artistSlug: "aurora",
  externalId: "fd16913a-e4c6-4168-bbd4-7ecb73342cb0",
  externalLink: "https://musicbrainz.org/work/fd16913a-e4c6-4168-bbd4-7ecb73342cb0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A+",
  singability: "C",
  tags: ["autism"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
