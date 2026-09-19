import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCoolKids = {
  id: "019ea416-0612-77a0-848a-47fb289b5444",
  type: "page-type/song",
  slug: "taylor-swift-cool-kids",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3813cffb-067f-4627-9ef9-8eb0716c9bef",
      externalLink: "https://musicbrainz.org/work/3813cffb-067f-4627-9ef9-8eb0716c9bef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cool Kids",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
