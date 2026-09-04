import type { Finding } from "../finding.page-type.ts"

export const seedRatedHeardTracksWereNeverHeard = {
  id: "01a062e2-014b-7832-b97b-168347b91395",
  pageTypeSlug: "finding",
  slug: "seed-rated-heard-tracks-were-never-heard",
  domainSlug: "domain/music-listening",
  claim:
    "The twenty-nine heard tracks naming no Spotify track id were never heard. Each was seeded from a song Alan had rated, to keep that song out of the new-music offer, and no Spotify track was ever matched to it. The rating each one carried is already kept on the song's own page, so the rows add nothing the catalog does not hold.",
  evidence:
    "The 678 rows of `alan.heard-music.tracks.jsonl` name four sources. Every row sourced `seed-top-tracks` (130), `seed-prior-window` (46) or `observed` (473) names a Spotify track id. Every row sourced `seed-rated` (29) names none, and no row sourced `seed-rated` names one. The split is total either way. All 29 title keys match a rated song page, of the 30 rated song pages the catalog holds. The 649 rows that do name an id were carried across whole, and each of the 649 ids is distinct.",
} as const satisfies Finding
