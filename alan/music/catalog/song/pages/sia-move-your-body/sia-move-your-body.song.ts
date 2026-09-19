import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMoveYourBody = {
  id: "019ea4c9-3379-7175-b5ee-4c892864a77f",
  type: "page-type/song",
  slug: "sia-move-your-body",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90278a27-9ba8-46d9-8657-a9dcc49cb241",
      externalLink: "https://musicbrainz.org/work/90278a27-9ba8-46d9-8657-a9dcc49cb241",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Move Your Body",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
