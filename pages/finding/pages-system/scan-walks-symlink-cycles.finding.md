---
page-type-slug: finding
slug: scan-walks-symlink-cycles
title: "A page scan falls back to a disk walk that follows symlink cycles, and the ignore that would stop it filters the results instead"
domain-slug: domain/pages-system
---

# Claim

A page scan reads the page index where the index describes the root it was given, and walks the disk where it does not. The walk follows symlinked directories, so in any tree whose workspace links form a cycle it enumerates the same file at ever-deeper paths and grows without bound until the kernel kills the process.

It does not bite in an ordinary checkout, because there the index answers and no walk happens. It bites whenever a caller presents a root other than the one frozen into the process at import — which is what a test computing its own root from its file location does inside the worktree the standard suite builds on every run.

The ignore rules that would exclude `node_modules` are applied to the paths the walk returned, not to the directories it descends. They are in the right place to shape an answer and the wrong place to stop the walk that produced it.

# Evidence

Measured 2026-08-28 at `8c1650a7`, on Bun 1.3.14 and Node 24.3.0.

WHICH SOURCE ANSWERS IS AN EXACT PATH TEST. `page/index/store/store.ts:219-220`:

    export function indexReaches(repo: string, root: string): boolean {
      return canonicalize(rootBeside(repo)) === canonicalize(root)
    }

`scannedFromIndex` at `page/index/scan/scan.ts:43` returns `null` unless that holds, and `scanIn` at `page/page-types.ts:105-106` takes the index answer only when it is not null.

WHAT IT IS COMPARED AGAINST IS FROZEN AT IMPORT. `rootBeside` at `repo/roots/roots.ts:104-107` answers `HERE` for akasha, and `HERE` at `:38` is a module-level const evaluated once when the module loads. Measured:

    AKASHA_ROOT at import : /var/home/walton/repos/akasha
    HERE                  : /var/home/walton/repos/akasha
    indexReaches("akasha", HERE)                             true
    indexReaches("akasha", "/var/tmp/suite-trees/x/repo")     false
    ...then setting process.env.AKASHA_ROOT to that worktree:
    rootBeside("akasha")  : /var/home/walton/repos/akasha    (unmoved)
    indexReaches("akasha", "/var/tmp/suite-trees/x/repo")     false

So the test is not "does this root have an index" but "is this root the one frozen at import", and no later assignment to `AKASHA_ROOT` can move it.

AN EARLIER DRAFT OF THIS FINDING SAID a worktree can never match and that every scan in a worktree falls past the index. That is wrong and is corrected here. In the suite's tree `AKASHA_ROOT` is the live checkout, so a scan taking `resolveRoots()` presents the live checkout and the index does answer. What falls through is a caller presenting a different root — `tools/lib/subjects.unit.test.ts:8` takes `new URL("../../", import.meta.url)`, which inside the worktree is the worktree, and passes it as `akasha`.

WHY `AKASHA_ROOT` IS THE LIVE CHECKOUT INSIDE A PINNED TREE. It is, and that is what sets the two roots against each other here. Why it is stands as its own claim in `pages/finding/checks-system/pinned-files-live-roots.finding.md`, which binds it; it is not restated here.

WHAT IT FALLS TO. `page/page-types.ts:123-128` walks the disk, and for a location-free suffix glob it walks the whole tree:

    const found = walked.flatMap((pattern) => [...scanGlob(pattern, root)])
    if (suffixes.size > 0) {
      for (const at of scanGlob(`**/*${MARKDOWN}`, root)) {

`scanGlob` at `page/glob/glob.ts:45-47` is `globSync(pattern, { cwd: root })` from `node:fs`.

THE WALKER FOLLOWS SYMLINKED DIRECTORIES. Measured on a synthetic tree of one real file and one link pointing at its own grandparent:

    /var/tmp/cyc/pkg/readme.md
    /var/tmp/cyc/pkg/node_modules/self -> ../..

`globSync("**/*.md", { cwd: "/var/tmp/cyc" })` returned **41 paths** for that one file:

    pkg/readme.md
    pkg/node_modules/self/pkg/readme.md
    pkg/node_modules/self/pkg/node_modules/self/pkg/readme.md
    ... and so on to a depth of forty

One link and one file give forty-one paths. A tree of many workspace packages linking to one another multiplies at every level rather than repeating a single chain, which is where the growth stops being a nuisance and becomes fatal.

WHAT THAT COSTS IN THE SUITE'S OWN TREE. `withSuiteTree` at `tools/lib/suite-tree.ts:43,46` dresses each worktree with `linkSibling` and `linkModulesInto`, so the tree it builds carries exactly the workspace links this walk follows. `tools/lib/subjects.unit.test.ts` scans from its own root there, and was measured at `State: R (running)` with `VmRSS: 8882216 kB` — 8.9 GB — climbing 2,705,928 kB to 2,977,816 kB over five seconds, about 54 MB a second, until killed. The same file in an ordinary checkout finishes in 3.2 seconds, three runs out of three, because there the index answers and no walk happens.

THE IGNORE IS APPLIED TOO LATE TO HELP. `page/page-types.ts:129` ends the scan with:

    return [...notIgnored(root, [...new Set(found)])].sort()

and `repo/ignored/ignored.ts:29` is `notIgnored(root: string, paths: readonly string[])` — it takes a list of paths and returns a shorter list. It cannot decline to descend a directory, because by the time it is called the descent has already happened and `found` already holds every path the cycle produced. The rule that would have excluded `node_modules` is present, correct, and downstream of the cost it would have avoided.

WHAT I DID NOT ESTABLISH. Whether `globSync`'s forty-level cap is a fixed depth limit, a cycle detector, or an artefact of that particular tree. I passed `exclude` as a predicate to bound the walk and it made no difference to the count, but my predicate tested the wrong shape of argument, so that is a failed experiment rather than evidence that `exclude` cannot do the job.

WHY THIS WAS NOT REPAIRED HERE. The two candidate sites, `scanGlob` in `page/glob/glob.ts` and `scanIn` in `page/page-types.ts`, are both on the path its own header says "every page read reaches". Changing what a page scan enumerates changes what every check, command and readout over pages sees. That is a change to ask for rather than to make at the end of a night, and the seat that owns it should weigh whether the right repair is to bound the walk, to make the ignore gate the traversal, or to stop a scan falling back to a walk at all when the index describes the repository but not the root.

HOW THIS RELATES TO THE FIXTURE FINDING, CHECKED RATHER THAN ASSUMED. `pages/finding/pages-index/fixtures-read-the-live-index-not-their-own.finding.md` reports the same shape — a root derived from `AKASHA_ROOT` and frozen while callers present others. It is not the same value. That finding's is `indexRoot()`'s `held` at `page/index/place/place.ts:50`, frozen at first call; this one's is `HERE` at `repo/roots/roots.ts:38`, frozen at import, in a different module. `indexReaches` reaches `HERE` through `rootBeside` and never calls `indexRoot()`, so keying `indexRoot` by its root — the repair that finding proposes and measured — does not touch this branch, and the walk described here would still happen. Two changes rather than one, against one design fault.

The two do meet in the remedy. Refusing the fallback rather than walking is only survivable once trees that are not the live checkout carry an index of their own, which is what that finding's ruling provides.

A SEPARATE QUESTION THIS RAISES. The fallback is silent. `scanIn` already refuses rather than walking when a caller names no repository and the index describes the root (`page-types.ts:107-115`), on the stated grounds that two answer sources can disagree and nothing downstream would say which was used. A named repository whose index does not reach the given root takes the walk with no such refusal, which is the same hazard through a different door.
