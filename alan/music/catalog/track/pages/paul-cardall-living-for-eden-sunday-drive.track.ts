import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenSundayDrive = {
  id: "01a0b4c8-4a43-7ea2-902b-fca6157e7c32",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-sunday-drive",
  ownLength: 3.203333333333333,
  ownProgress: 3.203333333333333,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sunday Drive",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sundaydrive|7FQRbf8gbKw8KZQZAJWxH2|192200",
  song: "song/paul-cardall-sunday-drive",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 9,
      externalId: "63Lm9VcUOCrU379mMNIdLo",
      externalLink: "https://open.spotify.com/track/63Lm9VcUOCrU379mMNIdLo",
    },
  ],
} as const satisfies Track
