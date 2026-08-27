---
id: 99f61774-6b05-5bcb-ad13-7439885c44e7
slug: app-build-warrant-restated-in-orchestrator
page-type-slug: finding
title: "App build warrant restated in orchestrator"
domain-slug: domain/global
---

# Claim

`packages/infra/checks/src/checks.workflow.ts` still states the warrant for the app-build gate family that `check-configs-app-build.ts` has retracted: that main runs the bundler pass last, from inside the destination pod, after `kubectl apply` has landed. The comment sits directly above the `buildAppBuildChecks` call site, so a reader at the orchestrator meets the withdrawn claim and a reader at the config file meets its correction, with nothing saying which is current.

# Evidence

Read in `/home/walton/worktrees/18484` at commit `3f3093fb49`, `packages/infra/checks/src/checks.workflow.ts` lines 86-89:

`// `app-build-<slug>` gates: run each deployable app's own `bun run build` on the branch, so the bundler pass that main runs LAST — from inside the destination pod, after `kubectl apply` has already landed — cannot first fail in production.`

The header of `packages/infra/checks/src/lib/check-configs-app-build.ts`, as of `9bdf5692b` on the same branch, retracts exactly that: `@infra/workflow-dsl` `templates/source-sync-build.ts` sets `set -e`, runs `bun run build` in the destination pod's `code-sync` sidecar, and only then `kubectl rollout restart`, so a failed build aborts before the restart and no broken release is served. The real cost it names instead is that `react-router build` empties its output directory first and no app `vite.config.ts` sets `emptyOutDir`.

The correcting commit deliberately excluded `checks.workflow.ts`: a sibling seat was mid-refactor in that file at the time. The file is clean in the worktree now, so nothing is holding the repair.
