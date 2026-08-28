---
id: 3777bf7e-63cb-5063-8b74-08dc0ec1d087
slug: output-shape-bound-in-prose
page-type-slug: finding
title: "Output shape bound in prose"
domain-slug: page-type/old-ops-command
---

# Claim

A verb's output shape is a contract its callers parse, and the only place it is written is prose in that verb's own help block — so a second verb answering with the same shape says so by naming the first verb rather than by naming what they both implement.

# Evidence

Three verbs answer with `{lines, count, cursor, isDone, complete, boundedBy}`: `ops loki logs`, `ops pipeline logs` and `ops temper watcher logs`. They are not independent implementations — all three reach `describeBounds` and `fetchLokiLogs` in `packages/infra/loki/cli/src/lib/`, so the shape is bound once in code. That module is `tools/lib/loki-fetch.ts` in akasha now, with `tools/lib/loki-diagnostics.ts` beside it.

What is not bound anywhere is the contract. Each verb restates the shape in its own help prose, and two of them cite the third instead of citing a document: `ops pipeline logs` says it "queries Loki with the same semantics as `ops loki logs`" and emits "the same shape as `ops loki logs --json`", and `ops temper watcher logs` says its output "mirrors `bun ops loki logs`". Nothing checks that any of those three claims is still true.

The shape has a real consumer, which is what makes it a contract rather than a formatting choice. `ops tests triage-fanout` reads from stdin and auto-detects "`ops loki logs` JSONL (`{timestamp, line}`)", naming the producing verb in its own help. Its documented composition is `bun ops loki logs <pod> --all | bun ops tests triage-fanout`.

Judged against `domains/repos/instructions-repo.md`'s Governed From Here — an instruction belongs in this repository whatever it governs, and `code-path:` is how one reaches code — the meaning of `complete` and `boundedBy` is an instruction that today stands only in a code module and in three help blocks. `domains/ops-loki.md` binds it for the loki namespace alone; the other two verbs sit in different namespaces and inherit nothing from it.

Re-measured 2026-08-27. All four verbs stand, and so does the arrangement. The shape is written out as prose in one verb's help — `pages/old-ops-command/ops-loki-logs.old-ops-command.md:36-41`, giving `{lines, count, cursor, isDone, complete, boundedBy}` and the meaning of `complete` and `boundedBy` — and the others still cite that verb rather than a document: `tools/commands/temper/watcher/logs.ts:1` reads "mirrors `ops loki logs`" in its own summary. Nothing checks the claim.

Not measured: how many other verbs across the surface declare a `--json` shape that another verb or a script parses, which cannot be counted mechanically; and whether the three shapes agree today in fact rather than in prose.
