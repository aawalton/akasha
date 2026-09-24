import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleDowntown = {
  id: "01a0b112-8ec1-79b0-851c-1b04bec41b16",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-downtown",
  ownLength: 3.4022833333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle", "release/vinny-marchi-downtown"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Downtown",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "downtown|5USAMqcbMAzF3HBmeD5pJF|204137",
  song: "song/vinny-marchi-downtown",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 2,
      externalId: "4LQKy6ifOt6doOH157akvv",
      externalLink: "https://open.spotify.com/track/4LQKy6ifOt6doOH157akvv",
    },
    {
      release: "release/vinny-marchi-downtown",
      discNumber: 1,
      position: 1,
      externalId: "1awHjw2GZ9nkdDvHsbhB4g",
      externalLink: "https://open.spotify.com/track/1awHjw2GZ9nkdDvHsbhB4g",
    },
  ],
} as const satisfies Track
