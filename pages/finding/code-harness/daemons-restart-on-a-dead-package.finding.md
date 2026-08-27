---
id: 466abe68-ea44-52f2-be1b-65561a08f8f2
slug: daemons-restart-on-a-dead-package
page-type-slug: finding
title: "The workstation daemons restart on a package that no longer exists"
domain-slug: domain/global
---

# Claim

`memory-reaper.service` and `wake-watcher.service` both run code out of the instructions repository now, and the only thing that ever restarted them keys off a code-repository package that has no source left. Neither restarts on a change to the code it actually runs, and both keep serving whatever was loaded when they last started.

# Evidence

Found on 2026-08-19 while looking for what else in the code repository the harness extraction had orphaned.

`memory-reaper.service` is active and its `ExecStart` is `bun tools/memory-reaper-daemon.ts`, run from the instructions repository. That daemon and its nine `tools/lib/memory-reaper-*.ts` libraries stand there; `packages/agents/supervisor` has no tracked file left, only build output.

The restart lives at `packages/alanwalton/projects/cli/src/lib/move-to-memory-reaper.ts`, called from `move-to-deploy-reconcile.ts` on a deploy. It reads:

    const MEMORY_REAPER_PACKAGE = "@agents/supervisor"
    …
    const closureDirs = computeClosureForPackage(MEMORY_REAPER_PACKAGE, worktreeDir)

and restarts only where a deployed file falls inside that closure. `move-to-wake-watcher.ts` is the same shape against the same package for `wake-watcher.service`.

Nothing under `tools/` restarts either unit, so an instructions-repository change to the daemon's own code reaches disk on the commit and reaches the running process never.

Its unit test carries the same staleness: `move-to-memory-reaper.unit.test.ts` builds its fixture out of `packages/agents/supervisor/src/memory-reaper-tick.ts` and `packages/agents/shared/agent-kill-alert.ts`, and neither path names a file any more. The test passes, because the paths are strings it counts rather than files it opens.

Whether the restart should follow the daemons into the instructions repository, or the daemons should be restarted by something watching that repository instead, is a design call this finding does not make.
