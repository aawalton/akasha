import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const clusterOperations = {
  id: "01a06865-abff-7010-adce-58aea93b2f89",
  pageTypeSlug: "domain",
  slug: "cluster-operations",
  definition: "the cluster tended by hand from the workstation",
  partSlugs: [
    "shell-script/bootstrap-namespace",
    "shell-script/ci-apply-manifests",
    "shell-script/create-tunnel",
    "shell-script/mirror-base-images",
    "shell-script/promote",
    "shell-script/registry-gc",
    "shell-script/rotate-age-key",
    "shell-script/rotate-cf-token",
    "shell-script/rotate-ssh-key",
  ],
} as const satisfies Domain
