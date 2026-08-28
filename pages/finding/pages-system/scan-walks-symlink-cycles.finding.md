---
page-type-slug: finding
slug: scan-walks-symlink-cycles
title: "A page scan falls back to a disk walk that follows symlink cycles"
domain-slug: domain/pages-system
---

# Claim

A page scan that falls back to a disk walk follows symlinked directories, so in a tree whose workspace links form a cycle it enumerates the same file at ever-deeper paths and grows without bound until the kernel kills the process.

# Evidence

Measured 2026-08-28 at `8c1650a7`, on Bun 1.3.14 and Node 24.3.0.

`page/page-types.ts:123-128` walks the disk, and for a location-free suffix glob it walks the whole tree:

    const found = walked.flatMap((pattern) => [...scanGlob(pattern, root)])
    if (suffixes.size > 0) {
      for (const at of scanGlob(\`**/*\${MARKDOWN}\`, root)) {

`scanGlob` at `page/glob/glob.ts:45-47` is `globSync(pattern, { cwd: root })` from `node:fs`.

Measured on a synthetic tree of one real file and one link pointing at its own grandparent:

    /var/tmp/cyc/pkg/readme.md
    /var/tmp/cyc/pkg/node_modules/self -> ../..

`globSync("**/*.md", { cwd: "/var/tmp/cyc" })` returned 41 paths for that one file: `pkg/readme.md`, `pkg/node_modules/self/pkg/readme.md`, and so on to a depth of forty. A tree of many workspace packages linking to one another multiplies at every level rather than repeating a single chain.

`withSuiteTree` at `tools/lib/suite-tree.ts:43,46` dresses each worktree with `linkSibling` and `linkModulesInto`, so the tree the standard suite builds on every run carries exactly those links. `tools/lib/subjects.unit.test.ts` scans from its own root there, and was measured at `State: R (running)` with `VmRSS: 8882216 kB` — 8.9 GB — climbing 2,705,928 kB to 2,977,816 kB over five seconds, about 54 MB a second, until killed. The same file in an ordinary checkout finishes in 3.2 seconds, three runs out of three, because there the index answers and no walk happens.

Not established: whether the forty-level cap in `globSync` is a fixed depth limit, a cycle detector, or an artefact of that tree. I passed `exclude` as a predicate to bound the walk and it made no difference to the count, but my predicate tested the wrong shape of argument, so that is a failed experiment rather than evidence that `exclude` cannot do the job.

When a scan falls to the walk stands as `scan-index-test-compares-a-root-frozen-at-import`.
