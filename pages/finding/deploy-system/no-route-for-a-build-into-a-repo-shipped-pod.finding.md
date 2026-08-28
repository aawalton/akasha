---
id: b19043c7-729e-56b4-96bf-08f846673ef2
page-type-slug: finding
slug: no-route-for-a-build-into-a-repo-shipped-pod
title: "A repo-shipped web pod needs an artifact its .gitignore keeps out of the repo"
domain-slug: domain/deploy-system
---

# Claim

The six web apps are shipped to the cluster as a git checkout, and the file each one starts from is gitignored, so no checkout can ever carry it and nothing in the pod's lifecycle makes it.

The pod's whole contract is that the repository brings everything: an init container clones or resets to `origin/main` and runs `bun install`, then the app container runs its server. That server loads a build output which the app's own `.gitignore` excludes. The one artifact the pod cannot start without is the one the delivery mechanism is defined to omit.

This held before the layout flattened and was not noticed, because a build made inside a pod long ago survives in the hostPath cache untracked, and being untracked is exactly what makes `git reset --hard` leave it alone. The pods were serving a fossil. The flattening moved the working directory, the fossil stayed at its old path, and the omission became visible as a crash rather than as a missing step.

A guard scoped by a declaration cannot see what stopped declaring; this is its mirror. A delivery scoped by a checkout cannot carry what declares itself uncheckable.

# Evidence

`smilingjenny/web/server.ts` loads `build/server/index.js`, and `git check-ignore -v smilingjenny/web/build/server/index.js` answers `smilingjenny/web/.gitignore:2:build/`. The path does not exist in the workstation checkout: `ls -d smilingjenny/web/build` returns `No such file or directory`.

Nothing in the pod builds it. `orchestratorCacheInitContainer` at `infra/k8s-types/src/orchestrator-cache.ts:29-69` runs, in order, a fetch and `git reset --hard origin/main` or a fresh clone, then `bun install --frozen-lockfile` at `:65-67`. There is no build in the script. `orchestratorCacheSyncSidecar` at `:121-157` is `command: ["sh", "-c", "sleep infinity"]` at `:142`, so the sidecar that once rebuilt in place now holds the pod open and does nothing else.

A build step does exist, and reading it as evidence that something builds these apps is the error to avoid. `discoverBuiltAppRoots` at `tools/lib/check-workflow/unbuilt-router-apps.ts:12-21` selects workspaces by `workspace.pkg.scripts?.build !== undefined` at `:17`. It reports that a `package.json` declares a build script and that `checkWorkflow` would compose a step for it. It reports nothing about any artifact existing. Six of the seven router apps satisfy it, and none of the six has a build.

That step is composed into a CI workflow — `workflow("check", …)` at `tools/lib/check-workflow/index.ts:212` — so it runs in a pipeline. The layout flattened at commit `0e6982101`, `Move every package in the code repository into akasha`, dated 2026-08-26 22:15:11 -0600. Main pipelines were retired 2026-08-22 and branch pipelines 2026-08-25. Every pipeline predates the flattening, so no pipeline of either kind has ever run against the current layout, and whether the step ran on branch pipelines as well as main does not bear on it.

The live pods confirm the fossil. `smilingjenny-web` served for 2d8h from a build at `/app/repo/packages/smilingjenny/web/build/`, the pre-flattening path, while the manifests now set `workingDir` to `/app/repo/smilingjenny/web`. Two deploys of that service were attempted and rolled back; the second reached `init-code` success with 445 packages installed and then failed in the app container with `error: Cannot find module '/app/repo/smilingjenny/web/build/server/index.js' from '/app/repo/smilingjenny/web/server.ts'`.

NOT MEASURED. Whether the other five apps fail identically — only `smilingjenny-web` was deployed, and the other five were inferred from sharing the init container, the gitignore pattern and the workingDir move. What the `code-sync` sidecar ran before it became `sleep infinity`, and on what date; only two commits touch that file in this repository and the earlier is the move itself, so the prior body is in the retired code repository's history and was not read. Whether any app's build is reproducible on the workstation at all, which was not attempted. Whether an image-shipped app elsewhere in the cluster already solves this, so nothing here says building in the deploy path is the only remedy.
