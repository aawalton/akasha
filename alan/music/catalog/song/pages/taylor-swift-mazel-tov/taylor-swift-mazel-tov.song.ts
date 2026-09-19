import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMazelTov = {
  id: "019ea416-1d46-77fe-b488-08966668b364",
  type: "page-type/song",
  slug: "taylor-swift-mazel-tov",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3eaad3a3-2aae-42e9-aa42-2ba1aba9ea1b",
      externalLink: "https://musicbrainz.org/work/3eaad3a3-2aae-42e9-aa42-2ba1aba9ea1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mazel Tov",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
