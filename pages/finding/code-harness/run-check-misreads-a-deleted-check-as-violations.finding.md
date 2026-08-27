---
id: a88f166c-b769-5df6-b76c-389f4267ed4e
slug: run-check-misreads-a-deleted-check-as-violations
page-type-slug: finding
title: "Run check misreads a deleted check as violations"
domain-slug: domain/global
---

# Claim

`run-check` exists to stop a check that died at module resolution being reported as a branch with violations. It does that for a check whose IMPORTS cannot resolve, and not for a check whose own script file is gone: Bun writes a different sentence for the second, and the classifier is keyed on the first. So a registry entry pointing at a deleted check reports exit 1, "this branch has violations", rather than exit 2, "this tool is broken".

# Evidence

`packages/infra/checks/src/lib/run-check-core.ts:32` holds the whole predicate:

```
const MODULE_RESOLUTION = /^error: Cannot find module /m
```

Bun 1.3.14 writes **two** different sentences, which I measured by driving `run-check.ts` at three throwaway scripts under `/var/tmp`:

| what is missing | Bun's message | classify | exit |
|---|---|---|---|
| a bare import (`@shared/graph-core`) | `error: Cannot find module '…' from '…'` | tool-error | **2** |
| a relative import (`./nope`) | `error: Cannot find module '…' from '…'` | tool-error | **2** |
| **the script file itself** | `error: Module not found "…"` | violations | **1** |

Driving `classifyCheckRun` and `decideCheckExit` directly with each string reproduces it with nothing else in the way.

**The tests agree with the code and both are wrong about the world.** `run-check-core.unit.test.ts:8` says in its own words that it uses a synthetic string "that no running check emits", and `run-check.cli.test.ts:137` asserts the real message for the BARE-import case, which is the case that works. Nothing exercises a missing script file, so the gap is invisible from inside the suite.

Found on the tree of #18682 while verifying #18741, which retires four checks — driving `run-check` at each removed path is what surfaced it. It is not that project's: no commit in tree #18682 touches `run-check.ts` or `run-check-core.ts`, and the same behaviour stands on `main`.

It still fails LOUDLY either way, so nothing passes silently. What is wrong is the channel, and the wrong channel is the one that tells a reader the branch has a defect when what is true is that a check has been deleted out from under its registry entry.
