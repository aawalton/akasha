import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDonTYou = {
  id: "019ea416-1198-7f71-8441-fd481dac8692",
  type: "page-type/song",
  slug: "taylor-swift-don-t-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ac68749b-c89c-4107-b3ad-aed726a57a19",
      externalLink: "https://musicbrainz.org/work/ac68749b-c89c-4107-b3ad-aed726a57a19",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t You",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
