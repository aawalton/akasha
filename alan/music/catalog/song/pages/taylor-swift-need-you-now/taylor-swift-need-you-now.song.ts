import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNeedYouNow = {
  id: "019ea416-31bd-736a-823d-44f92454785c",
  type: "page-type/song",
  slug: "taylor-swift-need-you-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3de1ab2b-cfd0-4113-815d-816e3448568c",
      externalLink: "https://musicbrainz.org/work/3de1ab2b-cfd0-4113-815d-816e3448568c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Need You Now",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
