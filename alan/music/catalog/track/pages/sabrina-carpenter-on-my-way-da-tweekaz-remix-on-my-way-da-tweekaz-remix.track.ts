import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterOnMyWayDaTweekazRemixOnMyWayDaTweekazRemix = {
  id: "01a0b111-2fcf-7bf4-bf3b-a0e1c860d23f",
  type: "page-type/track",
  slug: "sabrina-carpenter-on-my-way-da-tweekaz-remix-on-my-way-da-tweekaz-remix",
  ownLength: 3.4033,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-on-my-way-da-tweekaz-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Sp0jLZN8MgPnoGDufJS7N",
      externalLink: "https://open.spotify.com/track/4Sp0jLZN8MgPnoGDufJS7N",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "On My Way - Da Tweekaz Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7vk5e3vY1uw9plTHJAMwjN", artistName: "Alan Walker" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "329e4yvIujISKGKz1BZZbO", artistName: "Farruko" },
    { externalId: "6UOk7DmvqlzWmo6gjhZvn6", artistName: "Da Tweekaz" },
  ],
  trackKey:
    "onmywaydatweekazremix|329e4yvIujISKGKz1BZZbO,6UOk7DmvqlzWmo6gjhZvn6,74KM79TiuVKeVCqs8QtB0B,7vk5e3vY1uw9plTHJAMwjN|204198",
  song: "song/sabrina-carpenter-on-my-way",
} as const satisfies Track
