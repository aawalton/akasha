import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const clusterOperation = {
  id: "01a06865-abff-7010-adce-58aea93b2f89",
  type: "page-type/domain",
  slug: "cluster-operation",
  definition: "how a person looks after the cluster",
  parts: [
    "shell-script/bootstrap-namespace",
    "shell-script/ci-apply-manifests",
    "shell-script/create-tunnel",
    "shell-script/deploy-dns-functions",
    "shell-script/deploy-functions",
    "shell-script/mirror-base-images",
    "shell-script/promote",
    "shell-script/registry-gc",
    "shell-script/rotate-age-key",
    "shell-script/rotate-cf-token",
    "shell-script/rotate-ssh-key",
  ],
} as const satisfies Domain
