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
    "A secret value is reused from the one page holding it rather than copied into a second resource.",
    "No secret value changes; what moves is where a value is kept rather than what the value is.",
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "`infrastructure/cluster/` holds `api`, `provisioning`, `k8s-types` and `k8s-synth`. Three folders are left, each blocked by a file no page claims, which a move refuses: `cluster-operations` by `nodes.json`, `cluster-manifests` by `tunnel-routes.ts` and four sops files, and `service-system/cluster-services` by eleven more sops orphans, `registry.conf` and two grafana json files over the 15,000 byte ceiling. `checks/cluster-checks` stays. Alan settles whether the 51 manifest pages move.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-api`, `cluster-manifests`, `cluster-operations`, `cluster-provisioning` and `cluster-services` lose the prefix. Folder names only; slugs and npm names are untouched. That answers 23 of the 103 refusals here; the roots also fail on `tunnel-routes.ts`, `nodes.json`, an undeclared `cluster-secrets` and two domain pages in `cluster-provisioning`. 1137 refuse repo-wide.",
    },
    {
      statement: "Every value the cluster holds as a Secret comes from a secret page.",
      workingMemory:
        "21 `*.k8s-secret.sops.yaml` files hold 72 keys as whole Secret manifests encrypted in place, against 15 secret pages holding the rest. What applies them is CI rather than `secret-placing`: 19 workflow templates call `sopsDecrypt` at 44 sites, naming 20 of the 21 by path and piping into `kubectl apply`. `cloudflare-api-token` is in both shapes carrying one value, settled by sha256 of the two plaintexts, so its manifest is pure duplication.",
    },
    {
      statement: "One secret value is one page however many resources place it.",
      workingMemory:
        "87 placements hold 76 distinct values, so 11 placements copy 9 values. The cloudflare token is in `cloudflare-api-token/api-token` and `pipeline-engine-secrets/CLOUDFLARE_API_TOKEN`; `collections-secrets` copies `DATABASE_URL` to `ZERO_UPSTREAM_DB` and `JWT_SECRET` to `ZERO_AUTH_SECRET`. The page type keys one page to one `resourceName` and `resourceKey`, which forces the copy. A page needs a list of placements, and `placedAt` (`secret-placing.module.code.ts:109`) must key on those.",
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
