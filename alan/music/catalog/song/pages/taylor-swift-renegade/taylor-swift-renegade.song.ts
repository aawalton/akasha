import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRenegade = {
  id: "019ea416-32e9-7f35-843d-a54425580058",
  type: "page-type/song",
  slug: "taylor-swift-renegade",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4fb69b7f-ae79-40f8-92cf-f59496ec5feb",
      externalLink: "https://musicbrainz.org/work/4fb69b7f-ae79-40f8-92cf-f59496ec5feb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Renegade",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
