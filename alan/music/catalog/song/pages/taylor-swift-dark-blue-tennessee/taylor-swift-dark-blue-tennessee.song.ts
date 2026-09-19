import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDarkBlueTennessee = {
  id: "019ea416-136d-7c7e-aa15-08f98a30268c",
  type: "page-type/song",
  slug: "taylor-swift-dark-blue-tennessee",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c14fe825-4ba4-42ea-9620-81f09ba42d19",
      externalLink: "https://musicbrainz.org/work/c14fe825-4ba4-42ea-9620-81f09ba42d19",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dark Blue Tennessee",
  artist: "artist/taylor-swift",
  performed: true,
  written: "collab",
} as const satisfies Song
