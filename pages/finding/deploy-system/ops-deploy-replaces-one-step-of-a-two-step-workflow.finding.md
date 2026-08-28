---
id: a15539a2-d10b-502a-a39b-f756d464fb0c
page-type-slug: finding
slug: ops-deploy-replaces-one-step-of-a-two-step-workflow
title: "A web app's build runs in a retired pipeline, and ops deploy replaces only the step before it"
domain-slug: domain/deploy-system
---

# Claim

Deploying a web app takes two steps. `ops deploy` performs the first and has no second, and only a retired pipeline performs the second.

The first applies the app's generated Deployment. The second execs into the pod's sleeping `code-sync` container, fetches the commit, runs `bun install` and `bun run build`, stamps the commit built from, and restarts. The build is made inside the pod and never travels; `code-sync` sleeps so there is a shell to exec into.

Both steps are declared together and run only on a push to main. Main pipelines were retired 2026-08-22, branch pipelines 2026-08-25, and the layout flattened 2026-08-26 — so every pipeline predates the current paths, and no build exists at them.

For this initiative that is an ablation run in the wrong order. `dalla-deploy-system.initiative.md:13` names the pipelines as the version to remove and `ops deploy` as its replacement. The old version stopped before the new covered it, so neither path is live: a deploy now applies a Deployment whose pod cannot start.

# Evidence

`pages/finding/deploy/build-cache-unseeded.finding.md` already records this structure and was not read before the work below. It names the same six apps, the build made in the live pod, the gitignored `build/`, no init container building, and only a push to main filling the cache. It lacks only observation — "the failure is reasoned from these files, not observed". That, the dates, and the ablation consequence are what is new here.

It also names the hazard that defeats a by-hand stopgap. The caches are per-node hostPaths (`orchestrator-cache-locations.ts`: `/var/alanwalton-web-cache` and siblings) while pods select a workload class, not a host. A build exec'd into a running pod repairs that node only; the next reschedule fails identically.

Two steps, one declaration: `pages/workflow-template/workflow-smilingjenny-web.workflow-template.declaration.attachment.ts:11-16` applies `smilingjenny/web/generated/web-deployment.generated.yaml`, then `:18-25` runs `deploySourceSyncBuildAndRestart` with `buildPackagePath: "smilingjenny/web"` — the post-flattening path. Five siblings match, for `alanwalton-web`, `alanwalton-atlas`, `audhdalan-web`, `temper-web`, `archive-of-worlds-web`. The gate is `when: { branch: "main", event: "push" }` at `:8`.

The build is `source-sync-build.ts:89`, one `sh -c` chaining `bun install --frozen-lockfile && bun run build && printf %s SHA > STAMP`. It guards the state met in the cluster: `:54` tests for `build/server/index.js`, `:61` falls through to rebuild when the artifact or stamp is missing or stale. Because the stamp is last in the chain, a failed build leaves none and the next run repeats the work rather than claiming it done — so a by-hand run is repeatable, though only per node.

`ops deploy` has no second step: `ops-cli/global/deploy/deploy.command.code.attachment.ts` holds no `bun run build`, `kubectl exec` or `rollout restart`. It applies the same generated Deployment the workflow's first step applies.

Observed: `smilingjenny-web` deployed and rolled back twice. The second reached `init-code` success, 445 packages installed, then `error: Cannot find module '/app/repo/smilingjenny/web/build/server/index.js' from '/app/repo/smilingjenny/web/server.ts'`. The serving build sits at the pre-flattening `/app/repo/packages/smilingjenny/web/build/`, untouched by `git reset --hard` because it is untracked (`smilingjenny/web/.gitignore:2`).

`code-sync` was never a builder, measured not argued. The retired repo is served whole at `/data/git/repositories/alan/code.git`; its head `ded98dc277` empties the tree but keeps its parents. `name: "code-sync"` and `sleep infinity` both enter the file at `552f64ed08`, 2026-05-13, the oldest of its 43 commits under `--follow`, and it still reads `command: ["sh", "-c", "sleep infinity"]` at `965db687cd~1`, the last commit before the move. An earlier draft here named `0a4e86fec9` as the introduction and was wrong: that is 2026-06-25, six weeks later, and merely carries the same sleep at `:398`. The body read off it was right and the label was not — it was taken from the last row of a commit list truncated at forty lines, so "last shown" was read as "earliest". That the sleep is a decision is in `c6527d265d`, which strips build-env from a container that never built — meant as a builder, settled as an exec target, cleaned up after.

The build is not broken: `bun run build` for `smilingjenny/web` at current main exits 0, emitting `build/server/index.js` at 135,735 bytes — the path the pod failed to load. What is missing is a runner, not a working step.

One recorded hazard remains unfixed on this path. `pages/finding/deploy/stale-lock-crashloops-deploy.finding.md` traces an `init-code` crash-loop to stale locks under `refs/remotes/origin/`; `orchestrator-cache.ts:44` clears `.git/index.lock` and nothing else. That finding judges lock-clearing the band-aid and the cause of mid-fetch death the real fix.

This replaces `no-route-for-a-build-into-a-repo-shipped-pod.finding.md`, whose claim was checked and is false. It called `code-sync` a gutted builder — it is the target of a build and has always slept — and called the gitignore a fault, when the artifact is never meant to arrive by checkout. Both came of reading `sleep infinity` as an absence without asking what execs into it.

NOT MEASURED. Whether the other five fail identically; only `smilingjenny-web` was deployed and only `smilingjenny/web` built. Whether any runner exists outside the retired pipelines, unsearched beyond the declarations. Whether a workstation build matches one made in the pod — different base image, install tree and env; not compared. Whether anyone has noticed the staleness, so nothing here says how urgent this is.
