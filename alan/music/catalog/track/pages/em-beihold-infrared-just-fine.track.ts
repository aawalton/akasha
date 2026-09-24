import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdInfraredJustFine = {
  id: "01a0d3ab-bb28-77fc-8d52-8c50ce35e7d4",
  type: "page-type/track",
  slug: "em-beihold-infrared-just-fine",
  ownLength: 2.7942833333333335,
  ownProgress: 2.7942833333333335,
  partOfCollections: ["release/em-beihold-infrared"],
  status: "completed",
  unit: "unit/minutes",
  title: "Just Fine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "justfine|7o2ZQYM7nTsaVdkXY38UAA|167657",
  song: "song/em-beihold-just-fine",
  carriedBy: [
    {
      release: "release/em-beihold-infrared",
      discNumber: 1,
      position: 6,
      externalId: "08bQQHjk4wDnhRlOEqIt6z",
      externalLink: "https://open.spotify.com/track/08bQQHjk4wDnhRlOEqIt6z",
    },
  ],
} as const satisfies Track
