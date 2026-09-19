import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTiedTogetherWithASmile = {
  id: "019ea416-4402-72a7-9e6b-270da6c1fd44",
  type: "page-type/song",
  slug: "taylor-swift-tied-together-with-a-smile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2905cd22-4776-4103-b584-ce490b8cadf1",
      externalLink: "https://musicbrainz.org/work/2905cd22-4776-4103-b584-ce490b8cadf1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tied Together With a Smile",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
