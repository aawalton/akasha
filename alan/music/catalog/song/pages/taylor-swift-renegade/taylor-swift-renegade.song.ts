import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRenegade = {
  id: "019ea416-32e9-7f35-843d-a54425580058",
  type: "song",
  slug: "taylor-swift-renegade",
  title: "Renegade",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4fb69b7f-ae79-40f8-92cf-f59496ec5feb",
      externalLink: "https://musicbrainz.org/work/4fb69b7f-ae79-40f8-92cf-f59496ec5feb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
