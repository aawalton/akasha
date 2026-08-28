---
id: 91a29d55-9d31-5ada-95c8-dbdf305cf9d5
slug: untracked-tree-counts-as-perimeter
page-type-slug: finding
title: "Untracked tree counts as perimeter"
domain-slug: repo/akasha-repo
---

# Claim

An untracked scratch tree turns `links-resolve`'s perimeter verdict red. `listSurfaces` globs `**/*.md` over the working tree and excludes only `.git/`, so `code-server-explore/` — untracked, unignored, another seat's clone — contributes both perimeter breaks and fails the estate.

# Evidence

Measured 2026-08-02, first-hand.

`bun tools/run-checks.ts` reports `[links-resolve] fail — 3308 of 4203 links resolve across 981 surfaces — 2 broken on the perimeter, 893 under quarantine`. Both perimeter breaks sit inside one untracked tree:

- `code-server-explore/docs/CONTRIBUTING.md:280` links `../ci/README.md`
- `code-server-explore/docs/helm.md:117` links `values.yaml`

`git ls-files code-server-explore` returns 0 paths, `git status --porcelain` shows `?? code-server-explore/`, and `git check-ignore` does not match it. It is a working-tree-only clone of code-server, opened by a seat to read it, and no surface in the estate links to it.

`tools/lib/check.ts:23-30` is the whole of the enumeration: `new Bun.Glob("**/*.md").scanSync({ cwd: root, dot: true })`, skipping only paths starting with `.git/`. Nothing distinguishes tracked from untracked, and `isDirty` keys on the `dirty/` prefix alone — so anything untracked outside `dirty/` is perimeter by default.

This defeats the design the check states for itself. Its docblock: "THE VERDICT KEYS ON THE PERIMETER ALONE, and the quarantined breakage is reported without driving it. Summed, the bit saturates: this check was born into a tree that already held 55 broken quarantined links, so it has never once been green ... a check that stays red until it does is one nobody reads." The saturation it was built to avoid arrives anyway, from a direction it does not model: any seat cloning a repository into the root to read it turns the verdict red for every other seat, and the red names files nobody in the estate wrote, reviewed or links to.

The transition is observed rather than inferred. #17525 recorded `links-resolve pass — 0 broken on the perimeter` earlier the same day, against the same instrument.

Same cause as the two typecheck findings, at a second instrument: whole-root enumeration keyed on the working tree, not the estate. Distinct claim; the remedy differs.
