import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIMEveryWoman = {
  id: "019ea416-1b78-726a-aa87-ab27d2879237",
  type: "page-type/song",
  slug: "taylor-swift-i-m-every-woman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27c14c92-43f0-43a6-87d5-6a4ca3f94499",
      externalLink: "https://musicbrainz.org/work/27c14c92-43f0-43a6-87d5-6a4ca3f94499",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Every Woman",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
