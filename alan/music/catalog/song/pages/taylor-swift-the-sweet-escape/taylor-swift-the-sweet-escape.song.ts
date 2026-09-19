import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheSweetEscape = {
  id: "019ea416-3752-7d77-a0f9-492e87ebf6e3",
  type: "page-type/song",
  slug: "taylor-swift-the-sweet-escape",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76524660-faf5-30ae-831d-9026dcf88b8f",
      externalLink: "https://musicbrainz.org/work/76524660-faf5-30ae-831d-9026dcf88b8f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Sweet Escape",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
