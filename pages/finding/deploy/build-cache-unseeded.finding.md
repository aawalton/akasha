---
id: 378287ef-363f-548a-8a4a-f239c661cf1f
slug: build-cache-unseeded
page-type-slug: finding
title: "Six web deploys serve from a per-node build cache nothing seeds on a fresh node"
domain-slug: domain/deploy
---

# Claim

Six web deploys build inside the live pod and serve from a gitignored `build/` on a per-node hostPath cache: alanwalton-atlas, alanwalton-web, archive-of-worlds-web, audhdalan-web, smilingjenny-web, temper-web. No init container builds, and the server bare-imports `build/server/index.js`. Each selects a workload class rather than a host, so a pod can start on a node never built into, and only a push to main runs the step that fills the cache. What they need to run is not what they carry.

# Evidence

Instructions `77302be7`, code `2adb0f7e` read in the branch worktree `/var/home/walton/worktrees/change-19458`, not the code main checkout.

Instructions: `tools/lib/workflow-dsl/templates/source-sync-build.ts:89` runs `bun install && bun run build` by `kubectl exec` into the `code-sync` sidecar; `:67` syncs the repo in that same pod; `:91-92` restarts after building; `:53-59` skips only when pod HEAD, `build/server/index.js` and the stamp all match, `:60-62` rebuilding otherwise. `source-sync-build-provenance.ts:1` puts the stamp at `build/.build-sha`, inside the ignored directory. Six callers under `pages/workflow-template/` (control: `kubectlApply`, 33 files). `workflow-temper-web.declaration.attachment.ts:14` gates the step to a push on main.

Code: `orchestrator-cache.ts:48-82` clones or resets and runs `bun install`, and does not build. `orchestrator-cache-locations.ts:47-53` makes the cache a per-node hostPath. `packages/temper/web/deploy/k8s/synth.ts:99` selects a class, which `hostnames.ts:62-66` shows is a label, not a host; `:150,157` are both HTTP probes. `server.ts:26` imports with no fallback. `.gitignore:4` ignores `build`, and `git ls-files` on it returns 0.

Not measured: the failure is reasoned from these files, not observed — no pod was rescheduled and no cluster state was read. How many nodes carry the serve label was not determined. The five non-temper workflows were read only far enough to confirm the shared step; their packages were not checked individually. Two neighbouring things were noticed and not established: init resets to `origin/main` while the step resets to a sha, so source and output can differ; and build-then-restart enters that window on every deploy. No rootedness figure was taken.
