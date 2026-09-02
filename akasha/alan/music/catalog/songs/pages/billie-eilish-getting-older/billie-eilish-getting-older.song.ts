import type { Song } from "../../song.page-type.ts"

export const billieEilishGettingOlder = {
  id: "019ea4a9-870a-798d-af85-ef5955ea122e",
  pageTypeSlug: "song",
  slug: "billie-eilish-getting-older",
  title: "Getting Older",
  artistSlug: "billie-eilish",
  externalId: "543b7d16-5083-4618-ad8e-9fed1c8fba78",
  externalLink: "https://musicbrainz.org/work/543b7d16-5083-4618-ad8e-9fed1c8fba78",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A+",
  singability: "A-",
  tags: ["abuse"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
