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
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "Every folder this intent set out to move is under `cluster/`: manifests, operations, services and workflows. What is left outside is what the commands remodel gathered: nine command pages under `commands/pages/` naming the cluster or Talos, and `talos.namespace`. `machines/clusters` holds the cluster as a machine rather than as a workload, and the checks stay where a constraint puts them. A move rewrites nothing spelled as text, so a path in a string outlives it.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`cluster/` carries 18 refusals: 16 folders under `provisioning/talos/` open with `talos`, `cluster-api-fetch` opens with `cluster-api`, and `provisioning` holds two domain pages where a shape allows one. Renaming the three folders that arrived added no refusal and removed none, measured over a seeded layout. The check states no phase, so only a direct run measures it.",
    },
  ],
} as const satisfies Initiative
