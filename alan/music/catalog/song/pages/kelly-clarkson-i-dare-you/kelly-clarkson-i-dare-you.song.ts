import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIDareYou = {
  id: "019ea4ac-bc11-799b-8ecd-758f1983878f",
  type: "page-type/song",
  slug: "kelly-clarkson-i-dare-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "08b3ebac-7fa6-4574-90cc-6ec495aa327c",
      externalLink: "https://musicbrainz.org/work/08b3ebac-7fa6-4574-90cc-6ec495aa327c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Dare You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
