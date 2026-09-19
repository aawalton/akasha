import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouLlAlwaysFindYourWayBackHome = {
  id: "019ea416-44d5-75f5-aef1-1c54c2d2bb82",
  type: "page-type/song",
  slug: "taylor-swift-you-ll-always-find-your-way-back-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45efe3ef-f2cf-323f-9dee-5febc4dc2cf8",
      externalLink: "https://musicbrainz.org/work/45efe3ef-f2cf-323f-9dee-5febc4dc2cf8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’ll Always Find Your Way Back Home",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
