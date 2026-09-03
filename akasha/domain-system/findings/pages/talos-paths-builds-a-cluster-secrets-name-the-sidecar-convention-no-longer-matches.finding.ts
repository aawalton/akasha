import type { Finding } from "../finding.page-type.ts"

export const talosPathsBuildsAClusterSecretsNameTheSidecarConventionNoLongerMatches = {
  id: "01a06861-f664-7b21-9c4d-2f7e5a10c002",
  pageTypeSlug: "finding",
  slug: "talos-paths-builds-a-cluster-secrets-name-the-sidecar-convention-no-longer-matches",
  domainSlug: "domain/akasha-migration",
  claim:
    "`clusterSecretsSopsPath` builds a path that nothing stands at. It asks for `pages/cluster/<cluster>.sops.yaml`, and the bundle on disk is `pages/cluster/main.cluster.sops.yaml`, so for the cluster slug `main` the two differ by the `.cluster` the page-sidecar convention adds. Five talos commands reach the secrets through it.",
  evidence:
    "akasha/infrastructure/cluster-provisioning/talos/talos-paths/talos-paths.module.code.ts:5 holds `const SECRETS_DIR = \"pages/cluster/\"` and line 8 returns `resolve(ownRepoRoot(), `${SECRETS_DIR}${cluster}.sops.yaml`)`. `git ls-tree -r HEAD --name-only pages/cluster` answers `pages/cluster/main.cluster.md` and `pages/cluster/main.cluster.sops.yaml` and nothing named `main.sops.yaml`.\n\nThe importers are talos-apply, talos-bootstrap, talos-health, talos-kubeconfig and talos-secrets-gen. talos-secrets-gen.command.code.ts:67 writes to `clusterSecretsSopsPath(read.cluster)`, and its command page says the bundle is written 'beside that cluster's page'.\n\nThe file has one commit behind it, f72762e40d 'The pages land in akasha (batch 1)', which is where the sidecar name was taken; talos-paths was not moved with it. Because the mismatch is live and reaches provisioning, this migration moved the cluster page to akasha/machines/clusters/pages/main.cluster.ts and left the bundle at pages/cluster/, rather than repointing five provisioning commands blind. Repointing talos-paths at the page's new folder and the sidecar's real name is what lets the bundle follow.",
} as const satisfies Finding
