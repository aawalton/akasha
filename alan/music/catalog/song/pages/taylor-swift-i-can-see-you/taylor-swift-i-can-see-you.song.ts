import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftICanSeeYou = {
  id: "019ea416-22de-7d3e-b2a8-a0ae55bb30fa",
  type: "page-type/song",
  slug: "taylor-swift-i-can-see-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "874bdda9-5917-40d8-85a1-7279ae103ea1",
      externalLink: "https://musicbrainz.org/work/874bdda9-5917-40d8-85a1-7279ae103ea1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Can See You",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
