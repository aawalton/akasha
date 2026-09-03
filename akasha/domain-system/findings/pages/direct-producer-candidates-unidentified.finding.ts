import type { Finding } from "../finding.page-type.ts"

export const directProducerCandidatesUnidentified = {
  id: "01a06555-9f3d-70dd-9336-c3af6ad4a294",
  pageTypeSlug: "finding",
  slug: "direct-producer-candidates-unidentified",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's household food comes substantially from Smiths and Walmart, and the direct-from-producer alternatives that would reduce that fraction are named only as categories: bulk dry goods, produce through a local farm share, eggs or dairy through a neighbour, meat direct from a rancher. No specific producer has been identified in any category, so the shape he uses to cultivate local relationships elsewhere has never been applied to food.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 93 as `FOOD/direct-producer-list` (was item 36), citing the strategy section of `notes/food.md` and `notes/cultivating-local-relationships.md` for the shape being applied. The item does name Azure Standard as a bulk dry-goods candidate; the other categories it leaves generic.\n\nWhat I did not measure: I did not read `notes/food.md`, so the Smiths and Walmart fraction is the backlog's characterisation and I have no number for it. That no producer has been identified is what the item's open status implies as of 2026-07-10.",
} as const satisfies Finding
