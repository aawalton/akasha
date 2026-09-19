import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtLookingForLoveOnBroadway = {
  id: "01a0abeb-46c5-7448-9754-19d2c3e2863e",
  type: "page-type/track",
  slug: "james-taylor-2-jt-looking-for-love-on-broadway",
  ownLength: 2.3632833333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0aYkXRhGQLINhdv69RSmVK",
      externalLink: "https://open.spotify.com/track/0aYkXRhGQLINhdv69RSmVK",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Looking For Love On Broadway",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "lookingforloveonbroadway|0vn7UBvSQECKJm2817Yf1P|141797",
  song: "song/james-taylor-looking-for-love-on-broadway",
} as const satisfies Track
