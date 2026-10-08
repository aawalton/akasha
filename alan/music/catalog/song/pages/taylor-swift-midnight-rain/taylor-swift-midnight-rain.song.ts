import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMidnightRain = {
  id: "019ea416-331b-7f96-8bf1-f9ac087bda7c",
  type: "page-type/song",
  slug: "taylor-swift-midnight-rain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5182b11e-9b69-445c-adf0-74f6a9ac0aef",
      externalLink: "https://musicbrainz.org/work/5182b11e-9b69-445c-adf0-74f6a9ac0aef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight Rain",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:18.843Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
