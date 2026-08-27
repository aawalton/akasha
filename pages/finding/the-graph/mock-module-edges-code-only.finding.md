---
id: c1dd5ee1-37fd-5341-9b16-aee998955a41
slug: mock-module-edges-code-only
page-type-slug: finding
title: "The graph emits no mock-module edges for the instructions repository, so nothing outside the code repo guards what they are read for"
domain-slug: domain/the-graph
---

# Claim

The graph emits no `mock-module` edges for the instructions repository. `ts-file.edge.producer.ts:84` skips every node whose repo is not `code`, and that loop feeds the only input the producer builds edges from, so all five edge kinds it declares are code-only. Ts-file nodes stand for every repository and carry their parsed `mock.module` calls on their attrs, so those call sites are read and then dropped before they become edges. Nothing outside the code repo guards what they are read for.

# Evidence

Measured against code sha 376a3a822b2e40b2988efa96b36e04022d20fd45. I built the snapshot and counted every edge by its source node's repository. The whole mock-module line reads `mock-module: code=118`; no other repository appears on it. That 118 is exactly the population `check-mock-module-leak` reports at the same sha, so the check's entire subject is the code repo.

The instructions repository holds 84 `mock.module(` sites. Two are prose inside description strings at `packages/infra/checks/src/lib/repo-wide-ts-scanners.ts:64` and `:68`; the other 82 are real calls, in `tools/tests/**` and in `packages/collections/music/spotify`.

Where they are dropped: `tools/lib/graph/producers/file/ts-file/ts-file.edge.producer.ts:84` reads `if (node.repo !== CODE_REPO) continue`. The gate is reinforced downstream at `ts-file-edges-for-file.ts:27-31`, where both endpoint key builders hardcode `repo: CODE_REPO`, so striking line 84 on its own would leave the new edges dangling in the code repo's node namespace. Meanwhile `classify.ts:30` stores `mockModuleCalls` on every ts-file node whatever its repository, so the parse is done and the result thrown away.

This is not new, and moving check bodies out of the code repo did not cause it: the code repo's own copy of the check never covered the instructions repository either. What the move changes is the cost. Every test file that leaves the code repo passes out of the only instrument watching for this, and the check goes on reporting clean over a shrinking population its output does not explain.

One caution for whoever closes this: `tsFileNodeIdToCodeRepoRel` returning null outside the code repo is what scopes the checks reading these node types, so widening the graph takes that scoping away and each of them needs an explicit repo filter the same day.

Not measured: whether any of those 82 real call sites would in fact violate the rule, no instrument computing it there; whether the four other edge kinds the same line gates cost as much as this one.
