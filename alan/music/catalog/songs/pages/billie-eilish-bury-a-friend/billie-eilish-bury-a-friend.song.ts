import type { Song } from "../../song.page-type.ts"

export const billieEilishBuryAFriend = {
  id: "019ea4aa-165e-7ddc-bcfc-8508b790b9e8",
  pageTypeSlug: "song",
  slug: "billie-eilish-bury-a-friend",
  title: "bury a friend",
  artistSlug: "billie-eilish",
  externalId: "6f5d9995-4319-44fc-b008-cb70679fab78",
  externalLink: "https://musicbrainz.org/work/6f5d9995-4319-44fc-b008-cb70679fab78",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
