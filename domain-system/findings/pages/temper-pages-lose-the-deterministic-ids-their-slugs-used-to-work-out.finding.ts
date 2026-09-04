import type { Finding } from "../finding.page-type.ts"

export const temperPagesLoseTheDeterministicIdsTheirSlugsUsedToWorkOut = {
  id: "01a05fb2-1bd2-7471-a688-739ab3f791a5",
  pageTypeSlug: "finding",
  slug: "temper-pages-lose-the-deterministic-ids-their-slugs-used-to-work-out",
  domainSlug: "domain/temper",
  claim:
    "Temper's 5,557 pages carried a uuid version 5 worked out from the slug, so any generator could name a page's id without reading the page. akasha requires a version 7, which is minted once and read back thereafter, so the recreated pages take new ids and nothing can work an id out again.",
  evidence:
    "`pages/temper-armor-trait/divines.temper-armor-trait.md` states `id: 8db03357-cfa7-5edc-a26d-9fa7dd32d68b`, whose version nibble is 5. Every temper page sampled carries a version 5 id, which is a hash of a namespace and a name rather than a stamp, so re-running a generator over the same slug reproduced the same id and a page could be rebuilt from nothing but its slug. The `id-is-a-uuid-version-7` check refuses a version 5, and `id.text-property` states `generator: uuid-v7`, so `akasha write` mints an id as a page lands and that id is thereafter the page's identity for life. The recreated armor traits were therefore landed stating no id at all. What is lost is the ability of a capture outside akasha to address a page it has not read: a generator that used to work the id out must now read the index for the page carrying the slug.",
} as const satisfies Finding
