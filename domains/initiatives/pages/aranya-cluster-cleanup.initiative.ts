import type { Initiative } from "../initiative.page-type.ts"

export const aranyaClusterCleanup = {
  id: "01a06cf9-0d41-7a81-b1f0-f0e645bd59f2",
  pageTypeSlug: "initiative",
  slug: "aranya-cluster-cleanup",
  domainSlug: "domain/infrastructure",
  personaSlug: "aranya",
  constraints: [
    "Cluster checks remain in checks/ for ablation.",
    "The inference family takes a top-level folder of its own rather than a home under cluster/.",
    "A path inside a container is left as it is; only this machine's own scratch paths move to /var/tmp.",
    "What builds Kubernetes resources is named by a page type rather than by a file name suffix.",
    "Each manifest code file has a page of its own rather than being named by a path.",
    "A cluster service page sits under the domain it serves, and a folder is made where none is there.",
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "The keystone is `cluster-service.manifestCode`: still a text property naming a repo-root path, so no page claims the 51 attachments and `file-has-its-page` refuses any change touching one. Its file was renamed to `cluster-service-manifest-code`, freeing the slug for the manifest page type's own file property, so a path check reads as converted when nothing moved. `service-system/cluster-services` is 126 files reached through 8 subpath exports.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-api`, `cluster-manifests`, `cluster-operations`, `cluster-provisioning` and `cluster-services` lose the prefix. Folder names only; slugs and npm names are untouched. That answers 23 of the 103 refusals here; the roots also fail on `tunnel-routes.ts`, `nodes.json`, an undeclared `cluster-secrets` and two domain pages in `cluster-provisioning`. 1137 refuse repo-wide.",
    },
    {
      statement: "Every cluster service names a manifest page.",
      workingMemory:
        "None of the 51 cluster services names a manifest page; each names its code by a path instead. The 12 pages already typed `manifest` are shared libraries: all 12 refuse to load as entry points, and 11 reach the cluster only through an attachment importing them. `manifest-slug` is declared and `synth-discovery` keys on it, so the count holds at 57 as each service converts. Those 12 are a mistyping to unwind.",
    },
    {
      statement: "The inference family sits in a top-level inference/ folder.",
      workingMemory:
        "`inference.domain.ts` says inference runs on machines outside the cluster, so 244 files leave `infrastructure/`: 12 folders and the `inference` and `generation` domain pages. `domain/inference` declares 6 of them and wants the rest added. The same prefix rule renames `inference-clients`, `inference-pool`, `inference-runs` and `inference-commands` to `clients`, `pool`, `runs` and `commands`. `upscale`, `voice-inference` and `alerts` are mixed and split rather than moved.",
    },
    {
      statement: "Every working subagent has a page, and every stopped one has none.",
      workingMemory:
        "The page is the restart interlock rather than bookkeeping: `standingSubagentsOf` reads the pages on disk and gates `seat-resume.module.code.ts:265` and `stop-seat.module.code.ts:56`, so a wrong answer restarts a seat under a live subagent or refuses to restart an idle one. Both directions are live. `aranya-a5d85bfbd911ddb09` was reaped at 10:07:05 and worked on to 10:19, unlandable and unseen. 105 pages are there over 12 seats, 24 of them aine's, and all 3 aranya ones are stale.",
    },
    {
      statement: "A subagent whose page did not land does not work unseen.",
      workingMemory:
        "13 landings were refused in `.supervisors/<seat id>/subagent-presence.log`, each one because another landing held `.git/akasha-landing.lock` past 120s: 4 put-ups, whose subagents held no page from their first moment, and 9 take-downs, which are among the 105. `state-subagent.agent-hook.ts` already carries the gap as `Nothing reads that log to put up a page the refusal left unwritten.` The lock contention is a throughput question of its own at ~20 agents, which a self-heal would mask.",
    },
    {
      statement: "A landing that installs does not hold the lock every landing waits on.",
      workingMemory:
        "`installingIn` (`manifest-locking.module.code.ts:248`) calls `holding(root, () => installedIn(root))`, running `bun install` under `.git/akasha-landing.lock` while `holding.module.code.ts:7` waits at most 120000ms and refuses every landing behind it. A refused put-up leaves a working subagent with no page, blinding the `standingSubagentsOf` interlock. 13 are on disk; at ~90 commits a minute queueing is a second candidate, and the log carried no time until `9e5dcb43bf`, so neither is attributed.",
    },
  ],
} as const satisfies Initiative
