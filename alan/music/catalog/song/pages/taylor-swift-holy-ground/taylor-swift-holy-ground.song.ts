import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHolyGround = {
  id: "019ea416-268a-7981-af4e-abafa98e318c",
  type: "page-type/song",
  slug: "taylor-swift-holy-ground",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a23f5639-eb02-4912-b8f1-9a7f4d2be641",
      externalLink: "https://musicbrainz.org/work/a23f5639-eb02-4912-b8f1-9a7f4d2be641",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Holy Ground",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
