---
page-type-slug: finding
slug: dispatch-seeds-spell-a-repo-segment-no-node-carries
title: "240 check dispatch seeds spell a repo segment the graph never produces, so none can match a node"
domain-slug: domain/the-graph
---

# Claim

`tools/lib/check-workflow` declares 240 `dispatchNodes` ids whose repo segment reads `instructions`, and no id the graph produces spells that segment anything but `code`. The ids are matched by string equality with no membership test, so none of the 240 can equal a node.

This corrects `pages/finding/akasha-repo/retired-repository-names-remain-in-check-code.finding.md`, which reads the segment as inert: "Nothing reads that segment: the only parser splits the triple and discards it". Nothing splits it. The segment is part of the id.

That finding's conclusion stands — do not rewrite the 240 yet — but for a different reason than the one it gives. The reason is not that the segment is ignored; it is that the graph these ids address is a stub that throws, so the id form goes with the migration onto `graph/ask.ts`, and `CODE_REPO` at `repo/scope/scope.ts:5` means the rewrite is every node the graph produces rather than 240 literals.

# Evidence

Measured 2026-08-28 at `9df042ace3`.

THE ID CARRIES THE SEGMENT. `tools/lib/graph/key.ts:9` — `nodeKey` returns `\`\${type}:\${repo}:\${key}\`` wherever a repo is given, and `\`\${type}:\${key}\`` only where it is undefined. `tools/lib/graph/producers/lib/node-id.ts:4` always gives one: `nodeKey({ type, repo: CODE_REPO, key })`. `infra/cluster-checks/src/lib/graph-node-id.ts` builds the same shape from its own constant, `CHECK_FILTERING_REPO = "code"` at :1.

THE SEGMENT IS ALWAYS `code`. `repo/scope/scope.ts:5` reads `export const CODE_REPO: Repo = "code"`, and it is imported by 23 files. The only two `nodeKey` calls taking a variable repo — `tools/audits/foundation-synth-watch.ts:143` and `:191` — take it from an existing node's own `repo`, so they cannot introduce one. Nothing anywhere constructs a node id with `INSTRUCTIONS_REPO`.

IT IS MATCHED BY EQUALITY, NOT PARSED, AND THE ASYMMETRY IS VISIBLE IN ONE FUNCTION. In `infra/cluster-checks/src/lib/workflow-seed-files.ts`, the package seed at :114-:116 is built by `graphNodeId` and admitted only `if (graph.node(seedId) !== undefined)` — a membership test. The declared `dispatchNodes` at :102-:104 are added verbatim, `for (const id of dispatchNodes) seedIds.add(id)`, with no such test. So `ts-file:instructions:<path>` is carried into the seed set and can never equal `ts-file:code:<path>`.

THE COUNT. `bun infra/cluster-checks/src/checks/check-instruction-references.ts --repo-root /var/home/walton/repos/akasha` reports 2515 violations over 89468 tracked text files; 2239 stand under `pages/finding/`. Of the 276 outside it, 240 are under `tools/lib/check-workflow` and every one of the 240 spells `instructions` — none spells `code`. The remaining 36 are the deliberate ones the corrected finding names: 27 `pages/notification-feed`, 8 `pages/all-about-alan-finding`, 1 `pages/book-chapter`. Its 37th, on an initiative page, is gone, so its 277 reads 276 here; its 240 is unchanged.

WHY NOT REWRITE THEM NOW. `tools/lib/graph/queries/closure.ts:9` makes `closureFromSeeds` a stub that throws `oldGraphGone`, and the module says so at :1 — "The old graph is gone. This module is a stub so its callers still resolve." `workflow-seed-files.ts:124` calls it, so that path refuses wherever it is reached. The stub's own message names `pages/finding/graph-system/the-old-graph-is-stubs-nothing-removes.finding.md`, which is what this waits on. Rewriting the 240 before that migration settles the id form writes them twice.

A DEAD CONSTANT SITS BESIDE THE LIVE ONE. `repo/scope/scope.ts:7` exports `INSTRUCTIONS_REPO: Repo = "instructions"` and nothing imports it. The other matches for that name are shell variables in `infra/git-transport/` holding a bare-repo path, which is a different thing.

AN EARLIER READING ALREADY SAW THE FORM. `pages/finding/old-check/a-key-index-cannot-dispatch-on-a-removed-file.finding.md:15` records the old `fileNodeIdCandidates` building `<type>:code:<path>` from the extension alone and never asking whether the graph held that node, and records `closureFromSeeds` folding a path into its reached set without checking membership either.

Not measured: no graph was built and no id was resolved against one. Everything above is read from the id constructors and the seed path, not from a live lookup, and the stub makes such a lookup unavailable here. So this says the 240 CANNOT match, not that a match was attempted and failed.

Not measured: whether any of the 240 was ever reachable before the stub landed, so nothing here says what those checks' retrigger sets lost, or for how long.
