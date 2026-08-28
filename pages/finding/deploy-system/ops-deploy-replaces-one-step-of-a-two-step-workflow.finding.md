---
id: a15539a2-d10b-502a-a39b-f756d464fb0c
page-type-slug: finding
slug: ops-deploy-replaces-one-step-of-a-two-step-workflow
title: "A web app's build runs in a retired pipeline, and ops deploy replaces only the step before it"
domain-slug: domain/deploy-system
---

# Claim

Deploying a web app takes two steps: apply the Deployment, then exec a build into the pod's sleeping `code-sync` and restart. `ops deploy` does the first and has no second; only a pipeline does the second, and main pipelines were retired 2026-08-22. The layout flattened 2026-08-26, after every pipeline, so no build stands at the current paths.

Against `dalla-deploy-system.initiative.md:13`, an ablation in the wrong order.

# Evidence

`pages/finding/deploy/build-cache-unseeded.finding.md` records this structure, unread before this work: six apps, the build made in the live pod, the gitignored `build/`, only a push to main filling it. It marks itself unobserved; observation and the dates are new here. It also names the per-node hostPath caches that defeat a by-hand stopgap: a build exec'd into a pod repairs that node alone.

Two steps, one declaration: `workflow-smilingjenny-web.workflow-template.declaration.attachment.ts:11-16` applies the generated Deployment, `:18-25` runs `deploySourceSyncBuildAndRestart` with post-flattening paths, and `:8` gates on `{ branch: "main", event: "push" }`. Five siblings match.

`source-sync-build.ts:89` chains install, build and stamp in one `sh -c`; `:54` tests for `build/server/index.js`, `:61` rebuilds when artifact or stamp is stale. The stamp being last means a failed build leaves none.

`ops deploy` holds no build, exec or restart (`deploy.command.code.attachment.ts`); it applies the same Deployment the first step does.

Observed: `smilingjenny-web` deployed and rolled back twice; the second reached `init-code` success, then `Cannot find module '/app/repo/smilingjenny/web/build/server/index.js'`. The serving build sits at the pre-flattening `/app/repo/packages/…` path, untracked (`smilingjenny/web/.gitignore:2`). The build works: `bun run build` at current main exits 0, emitting that file at 135,735 bytes. What is missing is a runner.

`code-sync` never built: `name: "code-sync"` and `sleep infinity` both enter at `552f64ed08`, oldest of 43 commits in the retired `code.git`, and read so at `965db687cd~1`. `c6527d265d` strips build-env from it.

Ref locks stay uncleared — `orchestrator-cache.ts:44` clears only `.git/index.lock` — per `stale-lock-crashloops-deploy.finding.md`.

NOT MEASURED. Whether the other five fail identically; only smilingjenny was deployed and built. Whether a runner exists outside the retired pipelines. Whether a workstation build matches a pod's. Whether the staleness has been noticed.
