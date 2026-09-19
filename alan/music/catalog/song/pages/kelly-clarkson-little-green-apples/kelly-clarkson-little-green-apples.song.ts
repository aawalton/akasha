import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLittleGreenApples = {
  id: "019ea4b1-072b-7904-9465-c7cfef8e1d15",
  type: "page-type/song",
  slug: "kelly-clarkson-little-green-apples",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f32fe068-b44c-34ec-b8f6-1beaf06f4765",
      externalLink: "https://musicbrainz.org/work/f32fe068-b44c-34ec-b8f6-1beaf06f4765",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little Green Apples",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
