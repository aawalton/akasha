import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftUs = {
  id: "019ea416-46c2-7419-96f3-693e14cac048",
  type: "page-type/song",
  slug: "taylor-swift-us",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a9910ed-c8c6-419e-bbf4-ffdb0c92e6e3",
      externalLink: "https://musicbrainz.org/work/7a9910ed-c8c6-419e-bbf4-ffdb0c92e6e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "us.",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
