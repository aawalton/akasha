import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterOnMyWayOnMyWay = {
  id: "01a0b111-301b-77cb-8ff9-5e86a77568d8",
  type: "page-type/track",
  slug: "sabrina-carpenter-on-my-way-on-my-way",
  ownLength: 3.22995,
  ownProgress: 3.22995,
  partOfCollections: ["release/sabrina-carpenter-on-my-way"],
  status: "completed",
  unit: "unit/minutes",
  title: "On My Way",
  trackType: "studio",
  explicit: true,
  trackArtist: [
    { artistName: "Alan Walker" },
    { artist: "artist/sabrina-carpenter" },
    { artistName: "Farruko" },
  ],
  trackKey: "onmyway|329e4yvIujISKGKz1BZZbO,74KM79TiuVKeVCqs8QtB0B,7vk5e3vY1uw9plTHJAMwjN|193797",
  song: "song/sabrina-carpenter-on-my-way",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-on-my-way",
      discNumber: 1,
      position: 1,
      externalId: "4n7jnSxVLd8QioibtTDBDq",
      externalLink: "https://open.spotify.com/track/4n7jnSxVLd8QioibtTDBDq",
    },
  ],
} as const satisfies Track
