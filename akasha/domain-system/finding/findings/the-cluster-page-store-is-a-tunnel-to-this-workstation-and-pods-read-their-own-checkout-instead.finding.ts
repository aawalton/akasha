import type { Finding } from "../finding.page-type.ts"

export const theClusterPageStoreIsATunnelToThisWorkstationAndPodsReadTheirOwnCheckoutInstead = {
  id: "01a05e25-6f0a-76f0-97aa-0213fb582969",
  pageTypeSlug: "finding",
  slug: "the-cluster-page-store-is-a-tunnel-to-this-workstation-and-pods-read-their-own-checkout-instead",
  domainSlug: "domain/akasha-migration",
  claim:
    "The cluster's page store is a socat tunnel onto this workstation's akasha service, which answers for 71 page types; nothing breaks on the other 309 only because every web pod carries a full checkout that pages-query reads before it would reach the store.",
  evidence:
    '`kubectl -n page-store get deploy page-store` runs `alpine/socat` with `PROXY:tailnet-egress...:workstation.alanwalton.ts.net:8787`, revision 1, created 15h ago. It is the only page store service in any namespace. Asked over it, `page-type` answers 71 rows, the same 71 as `find akasha -name \'*.page-type.ts\'`; `daily-tracking`, `error`, `open-question`, `nav` and `sync` are each refused by name.\n\nIt also refuses the wire shape every current caller sends. `{"page-type":"readout"}` comes back `a question names a page type as `pageTypeSlug``, while `{"pageTypeSlug":"readout"}` answers the row. Both `@shared/pages-query` and `@akasha/pages-system/pages-query` build the first shape.\n\nThat should be an outage and is not. `alanwalton/web` holds `/app/repo`, a full checkout whose `pages/page-type` has 380 entries, and `standingOf` in `shared/pages-query/src/named.ts` answers `here` whenever a checkout is found, so the store is never asked. `/api/health` is 200 and `/` renders 12kB.\n\nSo the 22 files reaching `@shared/pages-query` are served by a checkout shipped into the pod rather than by the store. That is what makes them worth moving, and also why moving them wrongly would fail loudly in production where today they quietly succeed. This replaces an earlier finding of mine which read the 71-against-380 gap as a reason not to repoint; the gap is real, but the store path it describes is not the path production takes.',
} as const satisfies Finding
