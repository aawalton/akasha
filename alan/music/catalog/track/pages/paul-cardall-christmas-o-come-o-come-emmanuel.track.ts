import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasOComeOComeEmmanuel = {
  id: "01a0b4c8-33de-774a-ab1a-61143b13c1ef",
  type: "page-type/track",
  slug: "paul-cardall-christmas-o-come-o-come-emmanuel",
  ownLength: 4.2462,
  ownProgress: 4.2462,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "O Come, O Come, Emmanuel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ocomeocomeemmanuel|7FQRbf8gbKw8KZQZAJWxH2|254772",
  song: "song/paul-cardall-o-come-o-come-emmanuel",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 3,
      externalId: "0MAMeuBzELX6ydhBMg1eEO",
      externalLink: "https://open.spotify.com/track/0MAMeuBzELX6ydhBMg1eEO",
    },
  ],
} as const satisfies Track
