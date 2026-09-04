import type { Song } from "../../song.page-type.ts"

export const mitskiStar = {
  id: "019f0ea3-ddcd-71f0-a191-5c385c271244",
  pageTypeSlug: "song",
  slug: "mitski-star",
  title: "Star",
  artistSlug: "mitski",
  externalId: "926986af-dc22-432c-8cc6-2323f3d1a83f",
  externalLink: "https://musicbrainz.org/work/926986af-dc22-432c-8cc6-2323f3d1a83f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
