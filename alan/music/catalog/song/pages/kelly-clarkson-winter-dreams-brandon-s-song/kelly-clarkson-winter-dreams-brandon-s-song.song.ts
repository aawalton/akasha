import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWinterDreamsBrandonSSong = {
  id: "019ea4b1-cc25-7414-9c9d-82ac954238f6",
  type: "page-type/song",
  slug: "kelly-clarkson-winter-dreams-brandon-s-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30ce0cd4-95c9-43df-9a83-8184fc962000",
      externalLink: "https://musicbrainz.org/work/30ce0cd4-95c9-43df-9a83-8184fc962000",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winter Dreams (Brandon's Song)",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
