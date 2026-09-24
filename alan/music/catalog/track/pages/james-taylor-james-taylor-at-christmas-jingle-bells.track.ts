import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasJingleBells = {
  id: "01a0abeb-2ca0-74e0-a450-f4383ed6c122",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-jingle-bells",
  ownLength: 3.88155,
  ownProgress: 3.88155,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jingle Bells",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "jinglebells|0vn7UBvSQECKJm2817Yf1P|232893",
  song: "song/james-taylor-jingle-bells",
  carriedBy: [
    {
      release: "release/james-taylor-james-taylor-at-christmas",
      discNumber: 1,
      position: 4,
      externalId: "1CaStRZxso3iWWLzUFfjUL",
      externalLink: "https://open.spotify.com/track/1CaStRZxso3iWWLzUFfjUL",
    },
  ],
} as const satisfies Track
