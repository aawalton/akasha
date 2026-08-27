---
id: cf57958a-1a77-5ca4-ae3a-daab34ff64c1
page-type-slug: finding
title: "File class places underived"
domain-slug: domain/global
---

# Claim

A file class reaches CI dispatch only by being registered in seven places, and three of them are hand-written lists nothing derives from where a new class arrives: `fileNodeIdCandidates` in the CI matcher, `FILE_NODE_TYPES` on `pkg-contains-file`, and `CHECK_WORKFLOW_WATCH_NODE_TYPES`. The other four are compiler-forced. So the next file class can land in the four that force it and miss the three that do not, leaving it projecting to a node id in some readers and to nothing in others.

# Evidence

Read at `~/code` on `origin/main` at `dd276059628d`, 2026-08-10, while verifying project #18349.

A cross-tab over the seven places, deriving the class set from their union rather than from any one of them, puts all 17 file classes in all seven today. Reverting `check-workflow-watch.ts` alone to its pre-#18349 state makes the same instrument name `swift-file` and `fizz-file` as present in six places and absent from one, which is the shape being described.

What each place would do about an eighteenth class added tomorrow:

- `packages/shared/graph/producers/src/file/file-kind.ts` — `FileKind` union, compile-time.
- `packages/shared/graph/producers/src/file/file.node.producer.ts` — switch closed by `assertNever`, compile-time.
- `packages/infra/checks/src/lib/bare-ts-population-seeds.ts` — `POPULATION_FILE_KIND` is `Record<NodeType, FileKind | null>`, total by type.
- `packages/shared/graph/producers/src/file/register.ts` — barrel, caught by the engine's registration validation at build.
- `packages/infra/ci/worker/src/pure/matcher.ts` — hand-written `if (path.endsWith(…))` chain; `matcher.unit.test.ts` asserts extensions one by one and names no producer.
- `packages/shared/graph/producers/src/package/package-contains-file.edge.producer.ts` — hand-written `FILE_NODE_TYPES` array; no test pins it to the producer set.
- `packages/infra/checks/src/lib/check-workflow-watch.ts` — hand-written list; `check-workflow-watch-coverage.unit.test.ts` checks it against `TRACKED_FILE_POPULATIONS`, which is a second hand-written list in the test file, so a class in neither passes. Its second assertion is derived over the check configs and does catch a class some step already watches.
