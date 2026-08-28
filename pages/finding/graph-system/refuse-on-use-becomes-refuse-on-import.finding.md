---
page-type-slug: finding
title: "A stub that refuses on use refuses at import wherever a caller reads it at module scope"
domain-slug: domain/graph-system
slug: refuse-on-use-becomes-refuse-on-import
---

# Claim

A stub written to refuse when it is used refuses at import instead, wherever any caller reads its value at module scope — and a spread reads every key at once. So the guarantee holds only while nothing downstream touches the value outside a function, which no reading of the stub can tell you. The blast radius is then every module that merely sits downstream, including ones that never asked for the missing thing, and the error names the stub rather than the caller that forced it.

# Evidence

Measured on 2026-08-27 while removing the old graph engine from akasha. 197 engine files went; 67 modules were replaced by stubs whose values call `oldGraphGone(name)`.

`tools/lib/graph/producers/file/file-kind-authorship.ts` was reported by the peer session nimue.seat as throwing on import rather than on use, having kept a data constant verbatim while losing the imports that supplied its identifiers. Importing all 126 surviving modules in a loop found a second with the same shape, `producers/file/ts-file/parse-mock-module.ts`, where the extractor had also truncated two zod schemas to a bare `= z`. Reading the generator's output had found neither.

The first repair was a `goneRecord()` Proxy refusing on `get`, `has` and `ownKeys`, so an empty record could not read as a full one that matched nothing. It imports cleanly and refuses by name on use. It did not clear the reported path: `tools/lib/check-workflow/prose-mechanism-restatement.ts:63` reads the table at module scope, and `tools/lib/check-workflow/check-configs-source-scanners.ts:13` spreads the result at module scope again, so the refusal moved up two levels and still landed at import.

What cleared it was that the constant was never engine — a table of file kinds and their node type names, whose 27 imports all survived — so it was restored whole. After that, 126 of 126 old-graph modules import, and 115 of 116 across check-workflow, ci-worker-pure, pipeline-run, ci-test-fanout and main-pipeline-creator.

Since measured, at nimue.seat's prompting and with the same instrument. The 65 stubs have 229 transitive dependents; importing each in its own process gives 3 that read a stub at module scope — `infra/cluster-checks/src/derivers/reachable-from-primary-entry.node.deriver.ts` on `defineNodeDeriver`, and two tests on `createGraph`. One of those, `tools/tests/ci-worker-pure-skip-gate.test.ts`, passed 11 of 11 at the commit before the removal and failed after it, so the removal caused it. Alan ruled it deleted on 2026-08-27, at `8cab6f60e`. Reading it before removing showed 6 of its 11 tests exercised pure functions that took no graph at all, and went with the file.

The named suite reported 16 failing tests before the removal and 16 after, so the regression was invisible in the total and was reported as nothing broken. A count matching is not a set matching.

Also found by the same loop, and not caused by the removal: about 20 modules under `infra/cluster-checks/src/checks/` run their command on import rather than under a main guard, so importing one executes it.

Not measured: whether a lazy getter on the importing module would defer the refusal further than a Proxy does.
