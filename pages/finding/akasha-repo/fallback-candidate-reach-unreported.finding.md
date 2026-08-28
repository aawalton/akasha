---
id: a6106165-d5c2-5a2c-bf79-a01ac96bd899
slug: fallback-candidate-reach-unreported
page-type-slug: finding
title: "A reach resolved at run time is unreported until the code path runs"
domain-slug: repo/akasha-repo
---

# Claim

A reference resolved from a string at run time typechecks clean and passes every test, then throws the first time the code path runs. An import search finding nothing is therefore not evidence that a file is unused, and a name that has already stopped resolving is reported by nothing. Deleting a file on the evidence of typecheck, tests and an import search alone is not safe here.

# Evidence

The whole `ops` command surface is reached this way. `tools/ops/declared.ts:51` loads each command with `import(path)`, where `path` comes from a recursive `readdirSync` walk of `tools/commands` — the directory named at line 6, the root built at 39, the walk at 22-36, the loop at 41. `tools/ops/akasha.ts:47` does the same for the commands defined as pages, its specifier built by string surgery on the page path (`akashaEntryFor`, 28-30). The dispatcher gives no command file a static importer.

`git ls-files tools/commands | grep '\.ts$' | grep -v '\.test\.ts$'` returns 297 files reached only that way, re-counted 2026-08-27. Six of them are spawned by path in `tools/tests/ops-command-direct-run.test.ts:6-13`, so for those six the suite would catch a deletion.

A reach that has already stopped resolving stands in the tree. `pages/workflow-template/workflow-prometheus.workflow-template.declaration.attachment.ts:20-25` names six watches as `ts-file:code:packages/infra/k8s/src/prometheus/synth-*.ts`. Re-measured 2026-08-27, `ts-file:code:packages/` stands 109 times across 33 files, and akasha holds no `packages/` directory at all — so each resolves to nothing.

The one instrument that read these strings dropped what it could not resolve — `tools/lib/graph/producers/pipeline/step-names-file.edge.producer.ts:36` was `if (file === null) continue` — and re-measured 2026-08-27 that producer is itself gone, no producer under `tools/lib/graph/producers/pipeline/` reading a `ts-file:` string at all.

`pages/repo/akasha-repo.repo.md:23` states "This repository contains no unused code", and `pages/domain/agent-harness.domain.md:27` states "A removal has no author, so no check weighing one runs on it."

NOT MEASURED: I did not delete anything and re-run the compiler; that a removal typechecks clean rests on there being no static importer, checked by search. I did not count how many files in the tree are reached only by a run-time string.
