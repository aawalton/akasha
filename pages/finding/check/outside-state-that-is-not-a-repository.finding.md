---
id: 8147eba9-b4f6-57d5-9dc9-80a85f131c0c
slug: outside-state-that-is-not-a-repository
page-type-slug: finding
title: "Two code-repo checks judge outside state that is not a repository, so the closed class was too narrow"
domain-slug: domain/992
---

# Claim

Two registered code-repo checks reach a verdict on state outside that repository which is
not another repository, so the reach class #19407 closed is narrower than the intent line
it was dispatched against.

# Evidence

Measured on 2026-08-18 against `~/code` at `53e786d846`, after #19407 landed as
`2b169e8f93a7`.

Every registered check carrying a script — 122 of them, enumerated by importing the
`tools/lib/check-workflow/check-configs*.ts` tables the way `declaredCheckNames` (`tools/lib/check-workflow/declared-check-configs.ts:76`) does — was run twice: once as this
workstation stands, once with `HOME` pointed at a tree symlinking all 167 of the real
home's entries except `instructions`, `books`, `memory` and `stories`, and with
`INSTRUCTIONS_ROOT` and `BOOKS_ROOT` naming a path that is not there. 120 gave
byte-identical output and exit codes. The 2 that differed — `addon-build` and
`prometheus-rules` — differ the same way across two runs in one environment, being parallel
build ordering and a random temporary directory name. A planted control check reading
`~/instructions/domains` went 0 to 1 under the same harness, so it was not blind.

So no registered check's verdict turns on another REPOSITORY, which is what #19407 was
dispatched to close and did close.

What the same run found is a different class. `sops-manifests` exits 0 where a Kubernetes
API server answers and 2 where none does: its `kubectl create --dry-run=client` arm, at
`infra/cluster-checks/src/checks/check-sops-manifests.ts:90`, downloads the openapi schema
from the cluster, so every file fails identically when the cluster is unreachable.
`reverse-reachability-graph`, at `tools/lib/check-workflow/check-configs-graph.ts:20`, opens
with `if [ -f "$OUT" ]; then echo cache hit; exit 0; fi` against
`/ci-storage/reverse-reachability`, so a file outside the checkout decides whether the check
runs at all.

Neither is a repository, and `Local Verdict` on `domains/repos/code-repo.md` names the
instructions repository alone. But `check.md`'s intent line says "state outside the
repository it runs in", and a cluster that is down fails a branch that changed nothing —
the warrant `Local Verdict` gives for the repository case, holding here for a case it does
not cover.

Whether the line means the repository class it has been read as, or the wider class it
spells, is a definition question rather than a delivery one, which is why this is recorded
rather than acted on.
