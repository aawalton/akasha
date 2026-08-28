---
id: 3777bf7e-63cb-5063-8b74-08dc0ec1d087
slug: output-shape-bound-in-prose
page-type-slug: finding
title: "Output shape bound in prose"
domain-slug: page-type/ops-command
---

# Claim

A verb's output shape is a contract its callers parse, and the only place it is written is prose in that verb's own help block — so a second verb answering with the same shape says so by naming the first verb rather than by naming what they both implement.

# Evidence

Three verbs answer with `{lines, count, cursor, isDone, complete, boundedBy}`: `ops loki logs`, `ops pipeline logs` and `ops temper watcher logs`. They are not independent implementations — `ops loki logs` and `ops pipeline logs` both reach `describeBounds` in `tools/lib/loki-diagnostics.ts` and `fetchLokiLogs` in `tools/lib/loki-fetch.ts`, so the shape is bound once in code for those two. `ops temper watcher logs` now takes only `parseLokiDuration` from `tools/lib/loki-fetch.ts` and emits neither `complete` nor `boundedBy`, while its summary line still says it mirrors `ops loki logs`.

What is not bound anywhere is the contract. Each verb restates the shape in its own help prose, and two of them cite the third instead of citing a document: `ops pipeline logs` says it "queries Loki with the same semantics as `ops loki logs`" and emits "the same shape as `ops loki logs --json`", and `ops temper watcher logs` says its output "mirrors `bun ops loki logs`". Nothing checks that any of those three claims is still true.

The shape has a real consumer, which is what makes it a contract rather than a formatting choice. `ops tests triage-fanout` reads from stdin and auto-detects "`ops loki logs` JSONL (`{timestamp, line}`)", naming the producing verb in its own help. Its documented composition is `bun ops loki logs <pod> --all | bun ops tests triage-fanout`.

Judged against `domains/repos/instructions-repo.md`'s Governed From Here — an instruction belongs in this repository whatever it governs, and `code-path:` is how one reaches code — the meaning of `complete` and `boundedBy` is an instruction that today stands only in a code module and in three help blocks. `pages/domain/ops-loki.domain.md:20` binds it for the loki namespace alone; the other two verbs sit in different namespaces and inherit nothing from it.

Not measured: how many other verbs across the surface declare a `--json` shape that another verb or a script parses, which cannot be counted mechanically; and whether the three shapes agree today in fact rather than in prose.
