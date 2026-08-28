---
id: baa267b0-b82a-4cbf-af2a-3b0e8fa3f1ac
page-type-slug: finding
title: "Bun's node:fs globSync follows symlinked directories where Node's does not, and its exclude filters rather than prunes"
slug: bun-glob-follows-symlinks-where-node-does-not
domain-slug: domain/pages-system
---

# Claim

Bun's `node:fs` `globSync` follows symlinked directories. Real Node's does not, and neither does `Bun.Glob`. `page/glob/glob.ts` reaches for `node:fs` so the module stays loadable in the editor's node extension host, so under Bun every page scan that falls to a disk walk descends workspace links without bound. Its `exclude` option filters the results rather than pruning the walk, so it cannot bound one.

# Evidence

Measured 2026-08-28 on a tree of one file `pkg/readme.md` and one link `pkg/node_modules/self` pointing at its own grandparent.

    bun 1.3.14    globSync                        41 paths, deepest 122 segments
    node 22.20.0  globSync                         1 path
    Bun.Glob      scanSync, default                1 path
    Bun.Glob      scanSync, followSymlinks: true  41 paths

Real Node 24 is not on this machine and was not tested. Bun reports `process.versions.node` as 24.3.0, which is its own claim rather than a measurement of Node.

`exclude` under Bun was invoked 41 times, each time with a whole matched path up to 122 segments deep, and cut the answer from 41 to 1: it filters after the descent has already happened. Timed on that tree it saved nothing, 1.10 ms plain against 1.11 ms with it. Under real Node the same predicate is invoked during traversal with bare names — `pkg`, `pkg`, `node_modules`, `readme.md` — and prunes.

The head comment at `page/glob/glob.ts:7-9` records `node:fs` and `Bun.Glob` as measured to answer the same over this repository's own patterns and roots. They do, because a checkout carries no directory symlink. A tree dressed with workspace links is where the two part.

This is the cause standing behind `pages/finding/pages-system/scan-walks-symlink-cycles.finding.md`, which names `node:fs` as the walker and leaves `exclude` as a failed experiment. That finding cannot be added to: its Claim and Evidence already measure 872 and 6503 characters against a shape of 500 and 2000, so `page-holds-to-its-type` refuses every write to it.
