---
id: 97bc03b4-b4d0-58b6-a07e-98befdef2015
slug: sixty-packages-unreached-once-the-dead-dependency-list-went
page-type-slug: finding
title: "Sixty packages unreached once the dead dependency list went"
domain-slug: domain/global
---

# Claim

Sixty workspace packages now read as unreached by the off-workstation walk, and nothing has yet
judged what that means for any of them. The walk previously reported `0 unreached` over a
population of 376, because the `ops` bin package declared 79 workspace dependencies its source
never imported. Those went under #19221. Whether each of the sixty should leave the code
repository, be deleted, or is merely under-credited by a walk that still misses seeds is
undecided.

# Evidence

Taken with `ops graph off-workstation --repo-root /var/home/walton/code --json` against
`fd8f590e0f6c560ae030292df2b43246082b186d`, the commit that landed #19221, and against the same
tree before the change. `degradedRootClasses` was empty on both runs, so neither reading was short
a root class.

Before: `packagePopulation` 376, `reachedPackages` 376, `unreachedPackages` 0. After: the same
population, `reachedPackages` 316, `unreachedPackages` 60. Sixty left the reached set and none
joined it, and the after-run's unreached set is exactly the set that left. The result held across a
seed set that had itself grown between the readings (`rootCount` 482 to 610, `seedPackages` 115 to
117), main having moved; more roots can only widen reach.

The sixty are not restated here — `--reached` and the payload's `unreachedPackages` name them on
demand, and a list copied out would rot against the next reading. Not all of them were
dependencies the bin package declared; some were reached only through one of those declarations.
The set includes packages whose names read as surprising against what they do, which is why this
is filed as an observation rather than as a list to act on.

The walk can also under-credit, and this reading was taken after the work on that direction landed:
#19219 went in at `29e4c78ac34b`, one commit before #19221, so both are in these numbers. What it
left standing is a stated bound rather than a gap — a path a program composes at run time is
enumerated by no root class, and the command's own help says so. Any judgment on one of the sixty
is owed a check against that bound.
