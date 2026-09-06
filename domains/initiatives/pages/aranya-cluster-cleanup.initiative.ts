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
    "A count that turns over faster than the work is re-taken rather than written into working memory.",
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "`infrastructure/cluster/` holds `api`, `provisioning`, `k8s-types` and `k8s-synth`. Three folders are left, each blocked by a file no page claims, which a move refuses: `cluster-operations` by `nodes.json`, `cluster-manifests` by `tunnel-routes.ts` and three sops files, and `service-system/cluster-services` by seventeen more sops orphans, `registry.conf` and two grafana json files over the 15,000 byte ceiling. `checks/cluster-checks` stays. Alan settles whether the 51 manifest pages move.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-api`, `cluster-manifests`, `cluster-operations`, `cluster-provisioning` and `cluster-services` lose the prefix. Folder names only; slugs and npm names are untouched. Besides the prefixes, the roots fail on `tunnel-routes.ts`, `nodes.json`, an undeclared `cluster-secrets` and two domain pages in `cluster-provisioning`. The refusal counts are re-run rather than kept, the tree moving under them.",
    },
    {
      statement: "Every value the cluster holds as a Secret comes from a secret page.",
      workingMemory:
        "The manifests are whole Secrets encrypted in place, and what applies them is CI rather than `secret-placing`: workflow templates call `sopsDecrypt` and pipe into `kubectl apply`. `secret-place` is the step that replaces it, naming a resource and saying its Secret from the pages placing a value in it. cert-manager is through; the rest go one resource per commit, pages in, CI repointed, manifest deleted together, so no value is ever encrypted twice or nowhere.",
    },
    {
      statement: "One secret value is one page however many resources place it.",
      workingMemory:
        "Nine values are held in more than one place: the cloudflare token in `cloudflare-api-token/api-token` and `pipeline-engine-secrets/CLOUDFLARE_API_TOKEN`, `collections-secrets` copying `DATABASE_URL` to `ZERO_UPSTREAM_DB` and `JWT_SECRET` to `ZERO_AUTH_SECRET`, and `postgres-cnpg-superuser/password` equalling `postgres-secrets/POSTGRES_PASSWORD`. A shared value is what couples two resources, so it settles which resources one agent must migrate together.",
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
