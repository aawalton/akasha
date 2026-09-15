import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMidnightRain = {
  id: "019ea416-331b-7f96-8bf1-f9ac087bda7c",
  type: "song",
  slug: "taylor-swift-midnight-rain",
  title: "Midnight Rain",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5182b11e-9b69-445c-adf0-74f6a9ac0aef",
      externalLink: "https://musicbrainz.org/work/5182b11e-9b69-445c-adf0-74f6a9ac0aef",
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
