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
        "`cluster/operations` and `cluster/services` have arrived. Left is `infrastructure/cluster-manifests`, whose path 34 files spell as text, going whole and keeping its package name, so no import is rewritten. A move re-depths what an import spells and rewrites nothing spelled as text, and touching an old file runs every prose and lint refusal already latent in it.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "Renaming the three folders to `manifests`, `operations` and `services` under `cluster/` adds no refusal and removes none, measured by running the check over a seeded layout. `cluster/` carries 18 refusals: 16 folders under `provisioning/talos/` open with `talos`, `cluster-api-fetch` opens with `cluster-api`, and `provisioning` holds two domain pages where a shape allows one. The check states no phase, so only a direct run measures it.",
    },
    {
      statement: "The workflow language and its templates sit in cluster/workflow/.",
      workingMemory:
        "Both sit under `changes/`. All 38 declarations reach the language by its package name, so a move breaks no import, and only `bun.lock` and one comment spell either folder's path. A seeded run of `folder-matches-a-shape` over the whole layout under `cluster/workflow/` refused nothing, though the parent folder's own verdict is unproven: a probe cannot file a new page into the committed index.",
    },
  ],
} as const satisfies Initiative
