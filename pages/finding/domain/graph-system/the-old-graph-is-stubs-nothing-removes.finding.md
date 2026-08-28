---
page-type-slug: finding
title: "The old graph is stubs nothing removes"
domain-slug: domain/graph-system
---

# Claim

The old graph engine is gone and 65 files hold a stub where it was. Each refuses by name when called, so a caller reaching one gets a refusal naming the module rather than a wrong answer.

Their callers are still there. Nearly all of them are under `infra/cluster-checks/`, which does not typecheck and every `ops` command reaching which already fails, so the stubs are kept for whoever ablation-migrates that tree rather than for anything they do.

Nothing removes them. The rule is that the old version goes once the new one fully replaces it, and for `infra/cluster-checks` the new version has not been built, so the stubs outlive the engine by however long that takes.

# Evidence

Measured 2026-08-27 in akasha at `ff8477df6`. 65 tracked `.ts` files carry the header "The old graph is gone. This module is a stub", every one of them under `tools/lib/graph/`.

Their callers outside that tree are 20 files under `infra/cluster-checks/src/checks/` and two under `tools/lib/` (`pipeline-run/pipeline-configs-sha-pinned.ts` and `main-pipeline-creator/code.ts`).

Not measured: whether any of those callers is reached in a run that matters today, or what the replacement for the cluster checks would have to answer. The claim is about what is on disk, not about a failure observed in production.
