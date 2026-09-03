import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const sopsManifests = {
  id: "01a06810-9300-7936-a744-fc815df13e34",
  pageTypeSlug: "cluster-check",
  slug: "sops-manifests",
  definition:
    "the check refusing a SOPS manifest that will not decrypt or decrypts to what kubectl refuses",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "yaml-file" }, { nodeKind: "yml-file" }],
  treeSha: true,
  environment: '{"SOPS_AGE_KEY":{"secret":"AGE_SECRET_KEY"}}',
} as const satisfies ClusterCheck
