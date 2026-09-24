import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodAThousandYears = {
  id: "01a0afa2-1afb-7872-87b0-1efbd4105882",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-a-thousand-years",
  ownLength: 4.506883333333334,
  ownProgress: 4.506883333333334,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Thousand Years",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|270413",
  song: "song/evynne-hollens-a-thousand-years",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 2,
      externalId: "4UVKdTjE4WobaXwvjapVGn",
      externalLink: "https://open.spotify.com/track/4UVKdTjE4WobaXwvjapVGn",
    },
  ],
} as const satisfies Track
