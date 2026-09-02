import type { Song } from "../../song.page-type.ts"

export const siaGimmeLove = {
  id: "019ea4c8-bc3c-70da-a116-44fe9937025d",
  pageTypeSlug: "song",
  slug: "sia-gimme-love",
  title: "Gimme Love",
  artistSlug: "sia",
  externalId: "7ec2761d-1daf-4f78-a5ae-97c44ca41bf9",
  externalLink: "https://musicbrainz.org/work/7ec2761d-1daf-4f78-a5ae-97c44ca41bf9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
