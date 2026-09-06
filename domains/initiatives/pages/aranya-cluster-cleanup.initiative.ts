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
    "A cluster service page sits under the domain it serves, and a folder is made where none is there.",
    "No secret value changes; what moves is where a value is read from rather than what the value is.",
    "A count that turns over faster than the work is re-taken rather than written into working memory.",
    "A census names what it cannot see, and a comparison is run against a seeded fault before it is believed.",
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "`infrastructure/cluster/` holds `api`, `provisioning`, `k8s-types` and `k8s-synth`. Three folders are left, each blocked by a file no page claims, which a move refuses: `cluster-operations` by `nodes.json`, `cluster-manifests` by `tunnel-routes.ts`, and `service-system/cluster-services` by `registry.conf` and two grafana json files over the 15,000 byte ceiling. Each blocker is read by path rather than named by a page, so claiming it is a design change. `checks/cluster-checks` stays.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-api`, `cluster-manifests`, `cluster-operations`, `cluster-provisioning` and `cluster-services` lose the prefix. Folder names only; slugs and npm names are untouched. Besides the prefixes, the roots fail on `tunnel-routes.ts`, `nodes.json`, an undeclared `cluster-secrets` and two domain pages in `cluster-provisioning`. The refusal counts are re-run rather than kept, the tree moving under them.",
    },
    {
      statement: "Every working subagent has a page, and every stopped one has none.",
      workingMemory:
        "The page is the restart interlock rather than bookkeeping: `standingSubagentsOf` reads the pages on disk and gates `seat-resume.module.code.ts:265` and `stop-seat.module.code.ts:56`, so a wrong answer restarts a seat under a live subagent or refuses to restart an idle one. Both directions are live. `aranya-a5d85bfbd911ddb09` was reaped at 10:07:05 and worked on to 10:19, unlandable and unseen. How many pages are stale is counted when needed, the census turning over by the hour.",
    },
    {
      statement: "A subagent whose page did not land does not work unseen.",
      workingMemory:
        "13 landings were refused in `.supervisors/<seat id>/subagent-presence.log`, each one because another landing held `.git/akasha-landing.lock` past 120s: 4 put-ups, whose subagents held no page from their first moment, and 9 take-downs, which are among the pages on disk. `state-subagent.agent-hook.ts` already carries the gap as `Nothing reads that log to put up a page the refusal left unwritten.` All 13 fell in one 97-second window rather than under load, so a refusal is rare and the unread log is what makes it lasting.",
    },
  ],
} as const satisfies Initiative
