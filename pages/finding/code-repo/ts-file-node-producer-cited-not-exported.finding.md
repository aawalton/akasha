---
id: ee56bec8-695b-5706-85c0-f69db5cd6fa5
page-type-slug: finding
title: "Ts file node producer cited not exported"
domain-slug: repo/code-repo
---

# Claim

Twenty-eight files in the code repo name `tsFileNodeProducer` in prose as the producer that routes check file enumeration, and nothing in the tree exports or declares it. The name is the compound of two real ones beside it, which is what lets it survive review, and it sits only in comments, so the typecheck is green and every check passes.

# Evidence

Measured 2026-08-07 first-hand against `~/code` at `main` `383bf60d35`, while ingesting `dirty/questions/code-repo-check-cohort-overclaims.md`, which recorded the same absence at `77685cfbf5` and is now removed. Re-measured rather than carried over.

`git grep -n 'export.*tsFileNodeProducer'` returns nothing. `git grep -l 'tsFileNodeProducer'` returns 28 files, every hit a comment — `check-ast-unused.ts:16` and `:26`, `check-boundary-parse.ts:126`, `check-bundle-budget.ts:14`, `check-k8s-node-selector.ts:14` among them — typically as "the `tsFileNodeProducer` + `tsFileEdgeProducer` at `@infra/checks/producers/ts-file`".

What the code does instead is one function away. `packages/infra/checks/src/lib/ts-file-iteration.ts` holds `listTsFiles`, which calls `getOrBuildGraph` and in its fallback registers `packageNodeProducer`, `fileNodeProducer` and `tsFileEdgeProducer` — three producers, none of them the cited one — then walks `graph.nodes(TS_FILE_NODE_TYPES)` and drops `.generated.ts`, `.generated.tsx`, `.d.ts` and any segment in `CHECK_EXEMPT_DIRS`.

Why it survives: `fileNodeProducer` and `tsFileEdgeProducer` both exist and are exported, and the phantom is the compound of their halves, so a reader checking it against a neighbour finds a match.

What it costs is an agent reading a check to learn which files it opens. Those 28 docblocks send that reader to a symbol they cannot open, and the drops that decide the cohort sit three levels down in a function none of them names.

Nothing measures it. `check-repo-paths` scans string literals and reported 3 unrelated violations on this run; `check-instructions-citations` exits 0, asking only whether a citation crosses the repo boundary. Neither resolves a bare symbol name in prose.
