import type { Finding } from "../finding.page-type.ts"

export const thePageStoreOnlyCarriesAndWebPodsAnswerFromTheirOwnCheckout = {
  id: "01a05e34-8e2c-7147-a5ec-51abda3079c3",
  pageTypeSlug: "finding",
  slug: "the-page-store-only-carries-and-web-pods-answer-from-their-own-checkout",
  domainSlug: "domain/akasha-migration",
  claim:
    "The cluster's page store carries a request to the workstation and does nothing else; what answers is the akasha service, which answers for akasha's pages alone. A web pod reaches neither today, because pages-query answers from the repository checkout the pod carries.",
  evidence:
    '`infra/k8s/src/page-store/page-store.cluster-service.md` defines it as `what a pod reaches the workstation\'s pages through`, landed once at `7fc8eca369`. Its container is `alpine/socat` with `PROXY:tailnet-egress...:workstation.alanwalton.ts.net:8787`. It holds no page logic, so no behaviour belongs to it.\n\nWhat answers is the workstation service, whose page states `port: 8787` and whose package states as an invariant `It answers for the pages standing in akasha and for no others`. Asked directly it answers 71 page types, the same 71 akasha declares, and refuses others by name. It also takes only the newer body shape: `{"pageTypeSlug":"readout"}` answers, `{"page-type":"readout"}` is refused.\n\nNeither fact reaches a pod. `alanwalton/web` runs from `/app/repo/alanwalton/web`, `/app/repo/.git` is there and `/app/repo/pages/repo` names the repository, so `rootsHere()` finds a checkout and `standingOf` in `shared/pages-query/src/named.ts` answers `here`. `/app/repo/pages/page-type` holds 380 entries.\n\nThis replaces an earlier finding of mine that attributed the answering and the refusing to the page store itself. That was a conflation of the carrier with what it carries, and it turned a deliberate boundary into an apparent outage.',
} as const satisfies Finding
