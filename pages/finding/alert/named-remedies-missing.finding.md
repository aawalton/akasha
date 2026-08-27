---
id: 5d68bb8d-5113-57a4-b144-f022da2930f6
slug: named-remedies-missing
page-type-slug: finding
title: "Four of the seven ops commands named in alert attachments do not exist"
domain-slug: page-type/alert
---

# Claim

Four of the seven ops commands named in alert attachments do not exist. `ops inference pool-probe`, `ops oauth census`, `ops oauth status` and `ops query-perf triage` are absent from the live registry, against `ops merge-queue resume`, `ops merge-queue show` and `ops page show`, which stand. An alert is read while something is already wrong, so its named remedy is followed under pressure, and `tools/ops/dispatch.ts:92` answers a missing one with `ops: unknown command`.

# Evidence

Names taken by grepping `pages/alert/*` for `ops <group> <command>` and each checked against a registry built from `declaredCommands()` (`tools/ops/declared.ts`) and `forwarderCommands()` (`tools/ops/forwarders.ts`) — 423 paths. `ops query-perf triage` is named by two attachments, `query-baseline-breach-regression` and `query-sustained-mean-budget-exceeded`.

There is no `infra/query-perf` package; the query-perf work stands in `infra/k8s/src/prometheus/`, which is alive and has many importers. So the missing thing is the command, not the code behind it.

Not measured: how many commands are named in task documents, seat instructions or other attachments across this repository, and how many of those resolve. Only `pages/alert/*` was read. Nor whether any of the four was renamed rather than dropped.
