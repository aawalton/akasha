import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsOutroCredits = {
  id: "019ea497-e80b-778d-afda-b8b5ebbc109b",
  type: "page-type/song",
  slug: "imagine-dragons-outro-credits",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "49fa0f85-68a9-4274-9659-4dd336cb07ce",
      externalLink: "https://musicbrainz.org/work/49fa0f85-68a9-4274-9659-4dd336cb07ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Outro / Credits",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
