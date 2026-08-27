---
id: 5c8ac67e-c5af-591b-8e5f-31b3902b6741
slug: schema-change-conformance-unmeasured
page-type-slug: finding
title: "Schema change conformance unmeasured"
domain-slug: domain/global
---

# Claim

A write touching `tools/document/` has its conformance unmeasured, which is the one write for which the gate exists. `document-conforms` judges such a body against the schema the call proposes, in a copy of the repo it would produce; the copy carries only `.ts` files, and the registry loaded there reads a markdown document at module load, so the run exits 1 and the gate stands aside with the reason.

# Evidence

Observed on 2026-08-13 while landing a twenty-file change that touched `tools/document/types.ts`. Every one of the twenty reported `[document-conforms] not-applicable — the schema this call proposes exited 1 when loaded, so CONFORMANCE WAS NOT MEASURED for this write — it said: Bun v1.3.14 (Linux x64)`. The banner is the tail of a Bun crash, so the report names the runtime rather than the fault.

Reproduced outside the command. `tools/lib/materialize.ts` copies every non-quarantined `.ts` under the instructions root and nothing else. Copying exactly that set into a scratch directory — 1822 files — and running `bun tools/document/conform-run.ts --rel-path domains/global.md --body-file … --repo instructions` inside it exits 1 on `ENOENT: no such file or directory, open '<scratch>/monarch/merchants.md'`, raised from `tools/lib/category-rule-set.ts:13`, where `parseVocabulary(readFileSync(…))` runs at module load rather than inside a function. The same command in the real root exits 0 and prints its verdict.

The reach is every write whose pending set holds a `.ts` file under `tools/document/`, which is `proposesSchema` in `tools/gates/document-conforms.ts`. A write anywhere else is judged against the registry already on disk and is unaffected.

It reports rather than refuses, so nothing is locked out and the twenty files landed. What is lost is the measurement: a schema change that made the corpus non-conforming would land with the gate saying so in a line that reads like every other stood-aside gate.

`pages/finding/instructions-harness/synthetic-roots-need-corpus.finding.md` surveyed this hazard on 2026-08-10 for `refusals/` and named `gates/document-conforms.ts` as structurally clear of it. That reading holds for refusals and does not reach this: the corpus this one needs is a vocabulary, read by a module the registry imports, and no refusal is composed.
