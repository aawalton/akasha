import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBabyDonTYouBreakMyHeartSlow = {
  id: "019ea416-0f2e-7c54-b436-3053295f63da",
  type: "page-type/song",
  slug: "taylor-swift-baby-don-t-you-break-my-heart-slow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a2f7d24-e836-3c19-be20-fb92a468bacb",
      externalLink: "https://musicbrainz.org/work/9a2f7d24-e836-3c19-be20-fb92a468bacb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby, Don’t You Break My Heart Slow",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
