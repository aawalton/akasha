import type { Finding } from "../finding.page-type.ts"

export const thePageStoreAnswersAnythingOnTheHouseNetwork = {
  id: "01a05abf-bf17-72e0-a765-4f502b86f81a",
  pageTypeSlug: "finding",
  slug: "the-page-store-answers-anything-on-the-house-network",
  domainSlug: "page-type/cluster-service",
  claim:
    "The page query service binds every interface and asks nothing of a caller, so the whole page store is readable by anything on the house network, not only by what comes in over the private network. A pod reaching it by the workstation's house address would have been the shortest way to give the cluster a name for the page store, needing no forwarding pod at all, and it was declined for that reason rather than because it does not work.",
  evidence:
    "`ss -ltnp` on the workstation shows the service listening on `*:8787` rather than on the loopback and the private-network address. A throwaway pod in `default` posted the same `/ask` body to `192.168.68.50:8787` and to `100.64.0.4:8787`: the house address answered with rows in well under a second, the private-network address timed out at six, because pods hold no route for `100.64.0.0/10`. Nothing in `page-listening` asks the caller for a credential. A `Service` with no selector and a hand-written `EndpointSlice` naming `192.168.68.50:8787` would therefore have given `page-store.page-store.svc.cluster.local` with no pod behind it. It was not taken: that address is handed out by the house router and moves, where `workstation.alanwalton.ts.net` does not, and pinning the page store to one subnet gives up the reach the private network is for. The binding itself is the finding. Either the service should bind only loopback and the private-network address, or it should ask callers for something, and until one of those is so, every device on the house network can read every page.",
} as const satisfies Finding
