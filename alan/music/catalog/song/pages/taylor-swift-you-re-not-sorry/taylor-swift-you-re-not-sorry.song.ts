import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouReNotSorry = {
  id: "019ea416-484d-70c0-bab3-906206383473",
  type: "page-type/song",
  slug: "taylor-swift-you-re-not-sorry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9885890a-c662-3375-bd71-99e7887953b3",
      externalLink: "https://musicbrainz.org/work/9885890a-c662-3375-bd71-99e7887953b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re Not Sorry",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
