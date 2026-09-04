import type { Song } from "../../song.page-type.ts"

export const auroraMyBaby = {
  id: "019ea4a5-a5b0-7e94-83f4-52e50d398002",
  pageTypeSlug: "song",
  slug: "aurora-my-baby",
  title: "MY BABY",
  artistSlug: "aurora",
  externalId: "6accab02-9406-49ca-9857-c426baf8e06c",
  externalLink: "https://musicbrainz.org/work/6accab02-9406-49ca-9857-c426baf8e06c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
