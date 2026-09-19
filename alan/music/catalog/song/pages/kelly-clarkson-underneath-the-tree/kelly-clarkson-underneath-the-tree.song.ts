import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonUnderneathTheTree = {
  id: "019ea4c1-8bc5-7063-bf28-01431d7e0856",
  type: "page-type/song",
  slug: "kelly-clarkson-underneath-the-tree",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e82a05ea-1668-4efc-b994-cad8119ad8ac",
      externalLink: "https://musicbrainz.org/work/e82a05ea-1668-4efc-b994-cad8119ad8ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Underneath the Tree",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
