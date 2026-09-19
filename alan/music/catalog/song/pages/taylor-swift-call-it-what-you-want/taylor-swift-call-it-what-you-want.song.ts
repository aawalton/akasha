import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCallItWhatYouWant = {
  id: "019ea416-14d8-7a33-a8d3-1bbde2664f4a",
  type: "page-type/song",
  slug: "taylor-swift-call-it-what-you-want",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5cadac2-a2fd-4fda-b5db-064e21180efb",
      externalLink: "https://musicbrainz.org/work/c5cadac2-a2fd-4fda-b5db-064e21180efb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Call It What You Want",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
