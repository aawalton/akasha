import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBadGuy = {
  id: "019ea4a8-50ae-7eba-9f20-55aa2117c8b4",
  type: "page-type/song",
  slug: "billie-eilish-bad-guy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "06c9031d-476f-4d08-be46-72fc581cbe6a",
      externalLink: "https://musicbrainz.org/work/06c9031d-476f-4d08-be46-72fc581cbe6a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bad guy",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
