import type { Finding } from "../finding.page-type.ts"

export const theIndexCannotSeeTheChangeItJudges = {
  id: "01a04bd1-923f-7844-bc44-647752ba5b30",
  pageTypeSlug: "finding",
  slug: "the-index-cannot-see-the-change-it-judges",
  domainSlug: "domain/checks-system",
  claim: "A check that resolves a name through the index reads the world as it stood before the change, so a page naming a target the same change adds is refused for naming something that will be there.",
  evidence:
    "The index is written by the door after a change lands, so at patch time `reaches` answers from entries carrying nothing the change introduces, and says `no page carries the id` or `no page admitting X carries the slug Y`. The indexer itself does not have this problem: `settle` files identity and schema for every pending page before it calls `knownIn` and resolves relations, so a target added beside its namer resolves there. A check has no such ordering. It is handed the change and an index of the past, and the tree-backed resolution this replaces did not have the problem either, which makes it a loss rather than a limit. There is already a worked answer in the folder. `file-has-its-page` unions what the index knows with `claimedByTheChange`, which loads each page the change carries and derives what it claims, and judges against the union. Anything resolving relations at patch time needs that union or it refuses correct changes. Recorded rather than fixed because it is a shape every index-backed check has to take rather than a fault in any one of them, and the check that meets it first is being written now.",
} as const satisfies Finding
