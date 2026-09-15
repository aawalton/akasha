import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftConeyIsland = {
  id: "019ea416-037c-79d3-a4cd-545884fab647",
  type: "song",
  slug: "taylor-swift-coney-island",
  title: "coney island",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "100b0575-337a-443d-8845-9283eeda056a",
      externalLink: "https://musicbrainz.org/work/100b0575-337a-443d-8845-9283eeda056a",
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
