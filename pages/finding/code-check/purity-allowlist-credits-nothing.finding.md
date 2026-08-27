---
id: 5b7f940f-ed58-5310-ae61-bf8b408d67f3
slug: purity-allowlist-credits-nothing
page-type-slug: finding
title: "Purity allowlist credits nothing"
domain-slug: domain/global
---

# Claim

`check-functional-type`'s type-only purity allowlist credits nothing and cannot: `PURITY_TYPE_ONLY_ALLOWLIST` is the empty array, so `isWorkspaceDepCoveredByAllowlist` returns `false` for every input. The on-disk source scan feeding it still runs first, once per non-pure runtime dep of every workspace evaluated, and its result is discarded. Four files and 839 lines stand behind a relaxation that has never relaxed anything.

# Evidence

Read against `~/code` at `d01942409a` on 2026-08-07.

`packages/infra/checks/src/lib/functional-type-purity-allowlist.ts:62` declares `export const PURITY_TYPE_ONLY_ALLOWLIST: readonly PurityTypeOnlyAllowlistEntry[] = []`. `findEntry` walks that array and returns `undefined` for every pair; `isWorkspaceDepCoveredByAllowlist` returns `false` on `entry === undefined` before reading its `imports` argument at all.

The call site is `functional-type-dep-walkers.ts:113–124`, inside `hasOnlyPureWorkspaceDeps`. For each runtime dep inferred non-`pure`, where `importerName` and `workspaceDir` are both supplied, line 119 runs `scanWorkspaceImportsOfSpecifier(workspaceDir, name)` — a filesystem walk of the importer's source tree parsing every import statement against that specifier — and line 120 passes the result to a lookup that cannot succeed. The scan's ordering is what makes the cost real rather than notional: it is not short-circuited by the empty registry.

Four files carry the mechanism: `functional-type-purity-allowlist.ts` (113 lines), `functional-type-import-scan.ts` (270), and their two unit tests (223 and 233), totalling 839. The tests exercise the pure decision against synthetic registries passed as the optional third argument, so they stay green regardless of what the real registry holds — which is why nothing reports the emptiness.

The mechanism is not abandoned, it is unused: its one motivating case was resolved structurally instead, the shared row types having moved down into a rank-1 workspace so the non-pure neighbour left the importer's dep set. That is a good outcome for the graph and it left the relaxation with nothing to do.

`check-functional-type` stands on `domains/lists/unresolved-checks.md`, so it has not yet been read against what it guards and what it costs. Found while ingesting `dirty/knowledge/functional-type.md`, which recorded the empty registry and is queued for removal.
