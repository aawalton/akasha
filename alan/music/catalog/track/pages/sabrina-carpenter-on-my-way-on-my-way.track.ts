import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterOnMyWayOnMyWay = {
  id: "01a0b111-301b-77cb-8ff9-5e86a77568d8",
  type: "page-type/track",
  slug: "sabrina-carpenter-on-my-way-on-my-way",
  ownLength: 3.22995,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-on-my-way"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4n7jnSxVLd8QioibtTDBDq",
      externalLink: "https://open.spotify.com/track/4n7jnSxVLd8QioibtTDBDq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "On My Way",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "7vk5e3vY1uw9plTHJAMwjN", artistName: "Alan Walker" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "329e4yvIujISKGKz1BZZbO", artistName: "Farruko" },
  ],
  trackKey: "onmyway|329e4yvIujISKGKz1BZZbO,74KM79TiuVKeVCqs8QtB0B,7vk5e3vY1uw9plTHJAMwjN|193797",
} as const satisfies Track
