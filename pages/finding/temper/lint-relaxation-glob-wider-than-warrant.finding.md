---
id: 059ff246-5e55-572a-a9b4-6f6e916d0c02
slug: lint-relaxation-glob-wider-than-warrant
page-type-slug: finding
title: "Lint relaxation glob wider than warrant"
domain-slug: domain/temper
---

# Claim

The lint relaxation over Temper addon source is scoped by directory, while what it was
approved for is a population. Three lints are turned off across two globs covering every
file under a Temper addon's `src`, and the relaxation's warrant is byte-fidelity to an
upstream port. Natively-authored code placed in those same directories inherits the
relaxation, and nothing reports the difference between the files the glob reaches and the
files the warrant covers.

# Evidence

The root `biome.json` carries an override at lines 108-120 whose `includes` is
`["packages/temper/**/addon/src/**"]`, setting `correctness.noUnusedVariables` to `off`,
`correctness.noUnusedImports` to `off` and `nursery.useSortedClasses` to `off`. All three
are `error` in the base configuration.

`packages/temper/shared/addon-libraries/biome.json` carries a second override, `includes`
`["*/src/**"]`, turning off the same three rules over the ported libraries, whose
`lib-*/src` layout the root glob does not match.

Both globs select by directory. Neither distinguishes a machine-translated port, where a
dead local is upstream structure preserved deliberately, from a hand-written module in the
same tree, where it is an ordinary defect. A file authored from scratch at
`packages/temper/<domain>/addon/src/` is inside the glob on its first line.

Nothing measures the gap. `packages/temper/shared/build-deploy/checks/src/` holds the
addon check family — `check-held-addon-structure.ts`, `check-addon-sandbox-load.ts`,
`check-ti-clean-source-zero.ts`, `check-no-addon-bundle-field.ts`,
`check-addon-global-ownership.ts` and the rest — and none of them asserts anything about
which files under those globs are ported. `packages/temper/addons/territory.map.json`
records a `kind` per addon (`native` | `ported` | `library`), so the distinction exists in
the map at addon granularity, but no check joins it to the biome globs, and the map does
not descend to files.

The consequence is one-directional and silent: the lints pass, so a native module carrying
an unused import or an unsorted class reports clean, and a reviewer reading a green run
learns nothing about why.
