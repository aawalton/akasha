import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIDRatherGoBlind = {
  id: "019ea4af-a27a-795b-8bdd-bc70e8e142b4",
  type: "song",
  slug: "kelly-clarkson-i-d-rather-go-blind",
  title: "I’d Rather Go Blind",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a804f054-e3f4-3a2d-82d6-210b2dbfec3b",
      externalLink: "https://musicbrainz.org/work/a804f054-e3f4-3a2d-82d6-210b2dbfec3b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
