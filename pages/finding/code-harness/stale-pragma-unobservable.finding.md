---
id: 9cdaba3e-8624-5c9f-9d3b-826dbde58785
slug: stale-pragma-unobservable
page-type-slug: finding
title: "Stale pragma unobservable"
domain-slug: domain/global
---

# Claim

`check-ast-unused` never reports a suppression pragma that has stopped being needed. Its line pragma is tested before the liveness test and short-circuits it, so a pragma'd export is skipped without the check computing whether it is reached. Its diagnostic vocabulary has two kinds, `UnusedExport` and `PragmaValidationError`, and neither can carry a stale pragma. Every pragma it accepts is permanent by default, and the warrant written into the reason is never rechecked by anything.

# Evidence

`packages/infra/checks/src/lib/ts-import-graph-dead-exports.ts` lines 82-84:

```
const suppressingPragma = node.pragmas.lines.get(exp.line - 1)
if (suppressingPragma) continue
if (isLiveIn(live, node.filePath, exp.name)) continue
```

The pragma test precedes the liveness test and continues out of the loop, so for a pragma'd export `isLiveIn` is not evaluated. Staleness is not merely unreported; at this point it is not computed.

`check-ast-unused-json-contract.ts` line 18 fixes the vocabulary at `z.enum(["UnusedExport", "PragmaValidationError"])`. `ts-import-graph-reachability.ts` line 12 documents the latter as "suppression pragma present with empty reason" — the only pragma defect expressible.

`ts-import-graph-pragmas.ts` lines 10-11 hold both regexes. The reason is a `(.*?)` capture validated only for non-emptiness: no pattern, no reference that must resolve, no expiry.

Pragmas standing today naming a removal condition nothing measures: `packages/infra/checks/src/producers.generated.ts` line 31 ("consumed in Round 4 of #9661. Remove this pragma when the first caller wires in"), `derivers.generated.ts` line 7, and `packages/shared/pages/ui/src/index.ts` lines 60-68.

Noticed while ruling on a suppression for `packages/shared/status-bar-access` under #18893, where the consumer sits in the editor repository and is expected to be removed rather than kept.

Not measured: whether any pragma standing today is in fact stale. I did not test whether the conditions quoted above have been met, and the check cannot be asked. No repository-wide count of pragmas was taken, and whether `ast-unused-file: ignore` short-circuits at the same point was not read.
