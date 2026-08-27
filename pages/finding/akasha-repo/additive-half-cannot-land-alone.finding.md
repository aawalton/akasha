---
id: 11ede237-a24e-5797-80e4-1de2b52d23c8
slug: additive-half-cannot-land-alone
page-type-slug: finding
title: "Additive half cannot land alone"
domain-slug: repo/akasha-repo
---

# Claim

The additive half of a module move cannot land alone in akasha: an exported symbol that nothing calls yet is refused by the dead-export gate, so a client and its first caller belong in ONE commit.

# Evidence

Measured on 2026-08-12, moving a reading rule out of a shared module. The plan was one commit per module with the additive half first and the deletion last — the ordering that protects against a deletion landing before its re-points, which is what once left the agent packages unloadable in a checkout many seats shared.

Landing the client alone was refused. Every export the new module declared was reported "not reached from any entry", the reason `infra/cluster-checks/src/lib/ts-import-graph-dead-exports.ts:56` emits. The check indexes diagnostics by path and export name and flags a dead export whether or not a caller is planned.

Nothing local says so. The same tree passed the typecheck, the lint verdict, the test run and every syntax-bundle scanner clean. Only the gate named it, which costs a full cycle to learn.

What the ordering was protecting is unaffected: a deletion must still never land before its re-points. The correction is that "additive first" is not a licence for an export landing alone. The split is per-CONSUMER rather than per-module.

The other way past the check is a `// ast-unused: keep` pragma, matched at `infra/cluster-checks/src/lib/ts-import-graph-pragmas.ts:4` and honoured at `ts-import-graph-dead-exports.ts:41-42`, which skips the export on the line below it. That is a suppression, and an export whose caller is simply not written yet needs no suppression — it needs its caller in the same commit.

This bears on every further module queued to move out of a shared package on the same ordering.
