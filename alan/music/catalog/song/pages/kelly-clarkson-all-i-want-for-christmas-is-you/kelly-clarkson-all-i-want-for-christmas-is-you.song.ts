import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAllIWantForChristmasIsYou = {
  id: "019ea4b0-3a6a-7739-929c-bcd8ecbc0745",
  type: "page-type/song",
  slug: "kelly-clarkson-all-i-want-for-christmas-is-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cefda372-3ea5-41b3-9a05-9d9fdb68b827",
      externalLink: "https://musicbrainz.org/work/cefda372-3ea5-41b3-9a05-9d9fdb68b827",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All I Want for Christmas Is You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:44:33.258Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
