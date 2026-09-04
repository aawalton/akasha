import type { Finding } from "../finding.page-type.ts"

export const nothingInAkashaNamesAWorkloadNoPageClaims = {
  id: "01a0683e-687f-7207-8fcb-9dad1302a96d",
  pageTypeSlug: "finding",
  slug: "nothing-in-akasha-names-a-workload-no-page-claims",
  domainSlug: "domain/akasha-migration",
  claim:
    "Nothing inside akasha answers which workloads the cluster runs that no page describes. `deploy-system/running/running.ts` did, through `runningOf` and `unpaged`, and has no counterpart inside akasha. The akasha deploy path reasons only from a page outward to the cluster, never from the cluster back to the pages, so a workload whose page was deleted stands unnoticed.",
  evidence:
    "Read 2026-09-03 while migrating `deploy-system/`.\n\nWhat the old file did. `runningOf(kinds)` ran `kubectl get <kind> -A -o jsonpath='{range .items[*]}{.metadata.namespace}/{.metadata.name}{\"\\n\"}{end}'` once per kind and returned every workload standing, or a refusal naming the kind kubectl would not list. `kindsOf(services)` took the distinct `resourceKind` of the paged cluster services. `unpaged(workloads, services)` subtracted the paged ones by `kind/namespace/name` and returned the remainder sorted. `workloadOf` and `keyOf` were the key-making beside it.\n\nWhat stands inside akasha. `akasha/service-system/cluster-services/workload-deploying/workload-deploying.module.code.ts` has `upAlready(workload)`, which asks the cluster about ONE named workload, and `appliedOf(manifest)`, which asks `kubectl diff` about ONE manifest. Both start from a page. `akasha/command-system/commands/deploy/web-putting-up/deploy-web-putting-up.module.code.ts` begins at `deployableNamed(root, slug)` — a slug the caller supplies — so the whole path is page-first.\n\nWhat I searched. `unpaged`, `runningOf`, `kindsOf` and `workloadOf` match nothing under `akasha/` outside `findings/`. `kubectl get` with `-A` matches nothing.\n\nThe file was NOT ablated; `akasha migration-reach` answers `unreached` for it, and it stays as the only record of the sweep.\n\nNot measured: I did not run kubectl, so I do not say whether any unpaged workload stands right now. I say only that no code inside akasha would name one.",
} as const satisfies Finding
