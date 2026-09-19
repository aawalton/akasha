import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllNightDiner = {
  id: "019ea416-16ab-72db-92f6-1a9e0b810b6a",
  type: "page-type/song",
  slug: "taylor-swift-all-night-diner",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ddddac3b-178a-4211-aeee-8b694915b38d",
      externalLink: "https://musicbrainz.org/work/ddddac3b-178a-4211-aeee-8b694915b38d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All Night Diner",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
