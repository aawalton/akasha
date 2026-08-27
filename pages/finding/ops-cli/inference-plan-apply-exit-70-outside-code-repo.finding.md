---
id: 683beee4-8741-503a-b00a-ebe890c3d61c
page-type-slug: finding
title: "Inference plan apply exit 70 outside code repo"
domain-slug: domain/ops-cli
---

# Claim

`ops inference plan` and `ops inference apply` exit 70 — an unhandled defect — when run from anywhere outside the code repository, which is every seat's default working directory, because `findRepoRoot` throws a plain `Error` that `exitCodeForThrowable` does not classify.

# Evidence

Observed 2026-08-13 while running `domains/tasks/ops/move-command-bodies.md` over the `inference` namespace, on the delegating surfaces as they stood before the move and again on the moved bodies after it. The behaviour is identical either side, so the move neither caused nor repaired it.

From `/var/home/walton/instructions`:

    $ ops inference plan
    could not find repo root (no bun.lock) above /var/home/walton/instructions
    exit 70

From `/home/walton/code` the same verb runs and prints a 22-line reconcile plan, exit 0.

`packages/infra/inference/src/reconcile.ts` `findRepoRoot(start)` walks up from `process.cwd()` for the nearest directory holding `bun.lock` and throws a bare `Error` when it reaches the top. `packages/shared/cli-core/exit.ts` classifies through `isCliError`, four `instanceof` arms, none of which a bare `Error` satisfies — so the refusal lands as 70 rather than as the input refusal it is.

The message is accurate and the failure is loud. What is wrong is the class: 70 says the verb has a defect, where what happened is that the caller stood in the wrong directory, which is exit 1 and the caller's to fix.

This was not repaired while moving the body, because a repair made during a move cannot be told from the move. The surfaces were left byte-identical and the exit was proved unchanged.

Not established: whether either verb should depend on the invocation's cwd at all, rather than resolving the code repository the way `tools/lib/code-root.ts` does for everything else that reaches it. That would make both runnable from any seat and is a larger question than the exit code.
