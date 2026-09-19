import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhiteBlankPage = {
  id: "019ea416-4627-7c2f-8c8b-a96936c46f3f",
  type: "page-type/song",
  slug: "taylor-swift-white-blank-page",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5eccfb98-c5b6-4784-acd6-4457a6c21e5f",
      externalLink: "https://musicbrainz.org/work/5eccfb98-c5b6-4784-acd6-4457a6c21e5f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Blank Page",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
