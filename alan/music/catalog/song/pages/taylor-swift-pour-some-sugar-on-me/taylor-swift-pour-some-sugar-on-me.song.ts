import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPourSomeSugarOnMe = {
  id: "019ea416-3220-7b13-a0e9-13b15abfa8be",
  type: "page-type/song",
  slug: "taylor-swift-pour-some-sugar-on-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "400858e3-38fd-35c0-8fdb-dea449806942",
      externalLink: "https://musicbrainz.org/work/400858e3-38fd-35c0-8fdb-dea449806942",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pour Some Sugar on Me",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
