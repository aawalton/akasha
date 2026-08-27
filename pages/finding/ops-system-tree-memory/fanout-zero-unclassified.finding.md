---
id: f86ff956-0049-5411-9b5b-a79903e50d17
slug: fanout-zero-unclassified
page-type-slug: finding
title: "Fanout zero unclassified"
domain-slug: domain/global
---

# Claim

`ops system tree-memory --fanout 0` refuses with a plain `Error` and exits 70, so a caller's typo is reported as an unhandled defect rather than as the input refusal it is. The move carried the refusal across unchanged rather than repairing it, so the behaviour is now the instructions repo's to fix on a commit.

# Evidence

Measured 2026-08-13, running `move-command-bodies` over the `system` namespace.

Before the move, with the body still in the code repository at `packages/shared/utils/system/src/system/tree-memory.ts`:

    $ ops system tree-memory --fanout 0
    --fanout 0 dispatches nothing; pass the number of children
    exit=70

The neighbouring refusal, raised by the shared parser rather than by the body, exits 1:

    $ ops system tree-memory --fanout abc
    --fanout must be a non-negative integer, got: abc
    exit=1

`packages/shared/utils/system/src/system/tree-memory.ts` line 209 reads `if (fanout === 0) throw new Error("--fanout 0 dispatches nothing; pass the number of children")`. `packages/shared/cli-core/src/exit.ts` classifies a throwable through `isCliError`, which is four `instanceof` arms; a plain `Error` matches none of them and falls to the top-level catch at 70. 70 is documented there as "the verb threw something nobody tagged... an unhandled defect", and it is the one code no verb chooses.

The moved body at `tools/commands/system/tree-memory.ts` reproduces the throw verbatim, and both sides were run and compared: exit 70 before and after, byte-identical stderr. Preserving it was deliberate — `domains/tasks/ops/move-command-bodies.md` sets a byte-identical diff as the proof of a move, and a repair landed in the same act cannot be told from the move.

The repair is one line: `tools/lib/code-errors.ts` exports `inputError`, which resolves the code repository's own `InputError` class, so `throw await inputError(...)` would exit 1. It is now a commit in the instructions repo rather than a deploy.

Not measured: whether any other moved body carries the same shape. Only the ten verbs of the `system`, `launcher`, `local-executor`, `worker` and `worker-subscriber` namespaces were read.
