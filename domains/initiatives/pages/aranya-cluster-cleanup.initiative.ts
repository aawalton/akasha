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
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "The keystone is `cluster-service.manifestCode`: a text property naming a repo-root path, so no page claims the 36 attachments and `file-has-its-page` refuses any change touching one. A file property's value sits beside its page, so making it a file property is the move rather than a step before it. That one act closes the finding, frees 10 manifest conversions and opens this intent. `service-system/cluster-services` is 130 files reached through 8 subpath exports.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-api`, `cluster-manifests`, `cluster-operations`, `cluster-provisioning` and `cluster-services` become `api`, `manifests`, `operations`, `provisioning` and `services`. Folder names only; slugs and npm names are untouched. `infrastructure` already fails: 26 of its 52 children are declared nowhere, and `workspace-package/git-transport` is a declared part sitting at the repo top.",
    },
    {
      statement: "Every module building Kubernetes resources is a manifest page.",
      workingMemory:
        "28 modules build Kubernetes resources and were told apart only by the endings -manifests, -statefulsets, -daemonsets and -synth. 8 are carried over. 3 in cluster-manifests and upscale-serving-job are clear. 6 are synth sources found by DISCOVERY_GLOBS, so renaming hides them until synth-discovery asks the index instead. 10 wait on the keystone above. `akasha refactor retype` is being built, since removing a file asks for its whole body to be read.",
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
  ],
} as const satisfies Initiative
