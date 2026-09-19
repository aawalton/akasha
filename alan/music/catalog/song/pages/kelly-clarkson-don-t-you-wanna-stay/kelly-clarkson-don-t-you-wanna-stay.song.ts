import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonDonTYouWannaStay = {
  id: "019ea4ac-ff55-7291-96b1-53e49263ccc1",
  type: "page-type/song",
  slug: "kelly-clarkson-don-t-you-wanna-stay",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0fb3113c-e85d-4a8b-882b-07a20f8bba1f",
      externalLink: "https://musicbrainz.org/work/0fb3113c-e85d-4a8b-882b-07a20f8bba1f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t You Wanna Stay",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
