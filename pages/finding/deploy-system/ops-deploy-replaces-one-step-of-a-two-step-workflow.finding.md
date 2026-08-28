---
id: a15539a2-d10b-502a-a39b-f756d464fb0c
page-type-slug: finding
slug: ops-deploy-replaces-one-step-of-a-two-step-workflow
title: "A web app's build runs in a retired pipeline, and ops deploy replaces only the step before it"
domain-slug: domain/deploy-system
---

# Claim

Deploying a web app takes two steps. `ops deploy` performs the first and has no second, and the only thing that performs the second is a pipeline that no longer runs.

The first step applies the app's generated Deployment. The second execs into the pod's sleeping `code-sync` container, fetches the commit, runs `bun install` and `bun run build` in the app's directory, stamps the commit it built from, and restarts the deployment. The build is made inside the pod and never travels — that is the design, and `code-sync` sleeps precisely so there is a shell to exec a build into.

Both steps are declared together, and both run only on a push to main. Main pipelines were retired on 2026-08-22 and branch pipelines on 2026-08-25; the repository layout flattened on 2026-08-26. So no build has been made at the current paths, and none can be until something runs that step.

The consequence for this initiative is an ablation performed in the wrong order. `All services are deployed only using the ops deploy command` at `dalla-deploy-system.initiative.md:13` names the pipelines as the version to remove and `ops deploy` as the version to replace them. The old version stopped before the new one covered what it did, so for these six services neither path is live: the pipeline that would build them does not run, and the command that would stand in its place applies manifests only. A deploy of one of them now applies a Deployment whose pod cannot start, which is what happened twice.

# Evidence

`pages/finding/deploy-system/no-route-for-a-build-into-a-repo-shipped-pod.finding.md` claimed there was no route for a build into these pods. That claim was checked and is false; this finding replaces it, and the errors in it are named below so the correction is not silent.

The two steps stand in one declaration. `pages/workflow-template/workflow-smilingjenny-web.workflow-template.declaration.attachment.ts` composes `kubectlApply` over `smilingjenny/web/generated/web-deployment.generated.yaml` at `:11-16`, then `deploySourceSyncBuildAndRestart` at `:18-24` with `buildPackagePath: "smilingjenny/web"`, `dependsOn` the apply at `:25`. Five more declarations of the same shape stand beside it, for `alanwalton-web`, `alanwalton-atlas`, `audhdalan-web`, `temper-web` and `archive-of-worlds-web`. The build path given is the post-flattening one, so the declarations are current; it is the running of them that is not.

The build itself is `tools/lib/workflow-dsl/templates/source-sync-build.ts:89`:

```
kubectl exec -n NS -c code-sync "$POD" -- sh -c 'cd /app/repo/PKG && bun install --frozen-lockfile && bun run build && printf %s SHA > BUILD_SHA_STAMP_FILE'
```

It already guards the exact state that was met in the cluster: `:54` tests `test -f /app/repo/PKG/build/server/index.js`, and `:61` falls through to a rebuild where the artifact is missing or the provenance stamp is stale.

The gate on running is `when: { branch: "main", event: "push" }` at `:8` of that declaration. Main pipelines were retired on 2026-08-22, branch pipelines on 2026-08-25, and the layout flattened at commit `0e6982101`, `Move every package in the code repository into akasha`, dated 2026-08-26 22:15:11 -0600. Every pipeline predates the flattening.

`ops deploy` performs the first step and not the second. `ops-cli/global/deploy/deploy.command.code.attachment.ts` contains no `bun run build`, no `kubectl exec` and no `rollout restart`; it plans a `ClusterService`'s manifests and applies them. The Deployment it applies for a web app is the same generated file the workflow's first step applies.

Observed in the cluster: `smilingjenny-web` was deployed twice and rolled back twice. The second attempt reached `init-code` success with 445 packages installed, then failed in the app container with `error: Cannot find module '/app/repo/smilingjenny/web/build/server/index.js' from '/app/repo/smilingjenny/web/server.ts'`. The build the running pod serves sits at `/app/repo/packages/smilingjenny/web/build/`, the pre-flattening path, left there by the last pipeline run to exec a build in; it survives every `git reset --hard` because a build output is untracked, and `smilingjenny/web/.gitignore:2` is `build/`.

`code-sync` was never a builder, and this is measured rather than argued from its design. The retired code repository is still served whole at `/data/git/repositories/alan/code.git` on the `git-transport` pod: its head commit `ded98dc277`, `the code repository tracks nothing`, empties the tree but keeps its parents, so the history was emptied rather than truncated. The file stood there at `packages/infra/k8s-types/src/orchestrator-cache.ts`. At `965db687cd~1`, the last commit before the move, the sidecar reads `command: ["sh", "-c", "sleep infinity"]`. At `0a4e86fec9`, the commit that first introduced it, it reads the same. Across every commit between, the sidecar has held a sleep and nothing else.

That the sleep is a decision rather than an oversight is recorded in the same history. `c6527d265d`, `fix(#13291): remove dead build-env config from code-sync sidecar pod spec (3 web apps + helper)`, strips build environment off a container that never ran a build — so the sidecar was once meant to build, was settled as a target to exec into instead, and its leftover configuration was cleaned up afterwards. A reader meeting `sleep infinity` for the first time will take it for a gutted body, as the replaced finding did; that commit is what stops them.

The two errors in the replaced finding. It said the `code-sync` sidecar `once rebuilt in place` and had been reduced to a sleep — wrong twice over: the sidecar is the target of a build rather than its runner, and it has slept since the day it was written. It said a build had no route into the pod because `build/` is gitignored — the artifact is never meant to arrive by checkout, and the gitignore is correct rather than a fault. Both came of reading `sleep infinity` as a gutted body without searching for what execs into it.

The build is not itself broken. `bun run build` was run for `smilingjenny/web` on the workstation at current main and exited 0, emitting `build/server/index.js` at 135,735 bytes — the same path and file the pod failed to load. So what is missing is a runner for the step rather than a working step, and nothing here needs repairing before it can run.

A by-hand run of that step is safely repeatable, because the step refuses rather than reporting a build it did not make. `source-sync-build.ts:89` chains `bun install --frozen-lockfile && bun run build && printf %s SHA > BUILD_SHA_STAMP_FILE` in one `sh -c`, so a failed build never reaches the stamp, and `:55-61` reads that stamp back and falls through to a rebuild wherever it is absent or stale. A half-finished attempt therefore leaves the next attempt with the same work to do rather than with a claim that it is done.

NOT MEASURED. Whether the other five apps fail identically — only `smilingjenny-web` was deployed, and only `smilingjenny/web` was built. Whether any runner exists for these workflows outside the retired pipelines, which was not searched for beyond the declarations themselves. Whether a build made on the workstation matches one made in the pod, which was not compared; the workstation build says the sources compile, not that the pod would produce the same bytes. Whether the six pods are serving stale code that anyone has noticed, so nothing here says how urgent this is.
