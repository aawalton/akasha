import type { Initiative } from "../initiative.page-type.ts"

export const aranyaClusterCleanup = {
  id: "01a06cf9-0d41-7a81-b1f0-f0e645bd59f2",
  pageTypeSlug: "initiative",
  slug: "aranya-cluster-cleanup",
  domainSlug: "domain/infrastructure",
  personaSlug: "aranya",
  constraints: [
    "Cluster checks remain in checks/ for ablation.",
    "A path inside a container is left as it is; only this machine's own scratch paths move to /var/tmp.",
    "What builds Kubernetes resources is named by a page type rather than by a file name suffix.",
    "Each manifest code file has a page of its own rather than being named by a path.",
    "Every cluster service's domain folder sits in cluster/services/.",
    "No secret value changes; what moves is where a value is read from rather than what the value is.",
    "A count that turns over faster than the work is re-taken rather than written into working memory.",
    "A census names what it cannot see, and a comparison is run against a seeded fault before it is believed.",
  ],
  intents: [
    {
      statement: "Each service's own manifest sits with that service rather than under cluster/.",
      workingMemory:
        "No rbac module is left to move: each granted the `pipeline-engine` account rather than the service it was named for, and that account is ablated from the cluster and the tree. What is left under `cluster/manifests` is each service's own synth, manifests and constants, beside shared machinery that stays. Commands consolidate under `commands/`, and `machines/clusters` holds the cluster as a machine, so neither is this work. A module leaving is reached by path, no subject folder being a package.",
    },
  ],
} as const satisfies Initiative
