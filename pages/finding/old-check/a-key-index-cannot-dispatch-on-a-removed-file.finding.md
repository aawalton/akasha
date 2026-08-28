---
id: 019f3a91-2ce8-7a20-9d31-6f0c22b4e8a3
slug: a-key-index-cannot-dispatch-on-a-removed-file
page-type-slug: finding
title: "A key index cannot dispatch on a removed file"
domain-slug: domain/old-check
---

# Claim

Answering which node a path names by looking it up in the graph cannot dispatch anything on a deleted file, because a deleted file has no node to find. `Dispatch Reach` requires the opposite: a check is dispatched on a file removed, not only on one written. The behaviour was carried before by spelling the name from the path whether or not the graph held it, and that is the part a lookup cannot reproduce.

# Evidence

On branch `project-19441` at 2026-08-22, `fileNodeIdCandidates` was replaced by `graph.nodesByKey(path)`. The old function built `<type>:code:<path>` from the extension alone and never asked whether the graph held that node, so a removed file still produced a name, and `closureFromSeeds` folds a workflow's own source path into its reached set without checking membership either. The two together meant a deleted `.workflow.ts` still selected its own workflow.

Two tests stood on that and were rewritten rather than kept: one in `closure.unit.test.ts` asserting that a workflow's own source path intersects even when its node is absent, and one in `matcher-import-graph.unit.test.ts` covering a deleted `tunnel-routes.ts`. Both now assert the new answer, which is that a deleted file matches nothing.

The replacement is right about everything else. A hand-maintained extension table in the consumer had already drifted from the producer that owns the classification, and it named a node type for `tunnel-routes.ts` that the graph does not hold while missing the one it does. Deletions are the single case the old spelling got right, for a reason nobody had written down.

What makes this worth recording rather than patching in place: the obvious repair is to treat a changed file with no node as matching everything, and that is the failure already paid for once here — a seed matching nothing read as a workflow reaching nothing, and a pipeline passed having run almost nothing. Falling open and falling closed are both wrong, and which one applies turns on whether the file was removed or never had a node at all. The graph at the parent commit can tell those apart; the graph at the child commit cannot.

Worth deciding: whether selection asks about the parent commit for a path the child no longer holds, or whether a removed path is carried some other way.
