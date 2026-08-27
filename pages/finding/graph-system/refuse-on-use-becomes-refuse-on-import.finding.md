---
page-type-slug: finding
title: "A stub that refuses on use refuses at import wherever a caller reads it at module scope"
domain-slug: graph-system
---

# Claim

A stub written to refuse when it is used refuses at import instead, wherever any caller reads its value at module scope — and a spread reads every key at once. So the guarantee holds only while nothing downstream touches the value outside a function, which no reading of the stub can tell you. The blast radius is then every module that merely sits downstream, including ones that never asked for the missing thing, and the error names the stub rather than the caller that forced it.

# Evidence

Measured on 2026-08-27 while removing the old graph engine from akasha. 197 engine files went; 67 modules were replaced by stubs whose values call `oldGraphGone(name)`.

`tools/lib/graph/producers/file/file-kind-authorship.ts` was reported by the peer session nimue.seat as throwing on import rather than on use, having kept a data constant verbatim while losing the imports that supplied its identifiers. Importing all 126 surviving modules in a loop found a second with the same shape, `producers/file/ts-file/parse-mock-module.ts`, where the extractor had also truncated two zod schemas to a bare `= z`. Reading the generator's output had found neither.

The first repair was a `goneRecord()` Proxy refusing on `get`, `has` and `ownKeys`, so an empty record could not read as a full one that matched nothing. It imports cleanly and refuses by name on use. It did not clear the reported path: `tools/lib/check-workflow/prose-mechanism-restatement.ts:63` reads the table at module scope, and `tools/lib/check-workflow/check-configs-source-scanners.ts:13` spreads the result at module scope again, so the refusal moved up two levels and still landed at import.

What cleared it was that the constant was never engine — a table of file kinds and their node type names, whose 27 imports all survived — so it was restored whole. After that, 126 of 126 old-graph modules import, and 115 of 116 across check-workflow, ci-worker-pure, pipeline-run, ci-test-fanout and main-pipeline-creator.

Not measured: how many of the remaining 65 stubs have a caller reading them at module scope, which only importing every dependent would settle. Not measured: whether a lazy getter on the importing module would defer the refusal further than a Proxy does.
