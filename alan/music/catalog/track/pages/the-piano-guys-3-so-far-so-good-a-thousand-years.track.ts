import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodAThousandYears = {
  id: "01a0afa2-1afb-7872-87b0-1efbd4105882",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-a-thousand-years",
  ownLength: 4.506883333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4UVKdTjE4WobaXwvjapVGn",
      externalLink: "https://open.spotify.com/track/4UVKdTjE4WobaXwvjapVGn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Thousand Years",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|270413",
} as const satisfies Track
