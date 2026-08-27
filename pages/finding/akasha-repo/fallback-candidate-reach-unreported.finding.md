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

The whole `ops` command surface is reached this way. `tools/ops/declared.ts:51` loads each command with `import(path)`, where `path` comes from a recursive `readdirSync` walk of `tools/commands` — the directory named at line 6, the root built at 38, the walk at 22-35, the loop at 40. `tools/ops/akasha.ts:47` does the same for the commands defined as pages, its specifier built by string surgery on the page path (`akashaEntryFor`, 28-30). The dispatcher gives no command file a static importer.

`git ls-files tools/commands | grep '\.ts$' | grep -v '\.test\.ts$'` returns 299 files reached only that way. Six of them are spawned by path in `tools/tests/ops-command-direct-run.test.ts:6-13`, so for those six the suite would catch a deletion. That list is written by hand and names six.

A reach that has already stopped resolving stands in the tree. `pages/workflow-template/workflow-prometheus.workflow-template.declaration.attachment.ts:202` runs `bun packages/infra/k8s/src/prometheus/verify-live-rules.ts` inside a shell string. akasha holds no `packages/` directory at all, the layout that name assumes having gone with the absorbed code repo, so the step throws when the CI pod runs it and nothing before then says so.

Nothing reports it, because the one instrument that reads these strings drops what it cannot resolve. `tools/lib/graph/producers/pipeline/step-names-file.edge.producer.ts:36` is `if (file === null) continue`, so a step naming a vanished file yields no edge and no complaint.

The repository asks for exactly the deletions this makes unsafe. `pages/repo/akasha-repo.repo.md:23` states "This repository contains no unused code", and `pages/domain/agent-harness.domain.md:27` states "A removal has no author, so no check weighing one runs on it."

NOT MEASURED: I did not delete anything and re-run the compiler; the claim that a removal typechecks clean rests on there being no static importer, which I checked by search. I did not count how many files in the tree are reached only by a run-time string.
