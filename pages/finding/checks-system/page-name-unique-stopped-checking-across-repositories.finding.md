---
id: bbf63d5d-acf4-510c-9ada-d48b80e26bfa
page-type-slug: finding
title: "page-name-unique stopped checking across repositories"
domain-slug: domain/checks-system
---

# Claim

`page-name-unique` builds its index from two populations and one of them has been empty since the repositories were consolidated.

`checks-system/check/page-name-unique/page-name-unique.check.code.attachment.ts:34` spreads `pagesOver(INSTRUCTIONS, stillLent(...))` alongside the akasha pages. `stillLent` at line 14 opens with `const lending = rootsHere()[INSTRUCTIONS]` and returns `[]` where that is `undefined`. `instructions` is not among the `*.repo.md` pages `REPOS` is scanned from, so `rootsHere()` never carries a key for it, so `lending` is `undefined` on every run and `stillLent` returns `[]` on every run.

What the check no longer enforces: that a page landing in akasha does not take a name a page still held in the instructions repository already carried. That arm existed for the window in which pages were moving out of instructions into akasha and the two trees both held pages; it caught a name colliding across the two. The move is finished and the instructions repository is gone, so the enforcement is not merely dead but moot.

The check is not vacuous. Its other arm, `pagesOver(AKASHA, tree.paths()...)` at line 30, is live and does the work the check is named for: it catches two pages inside akasha sharing a page name. Removing the dead arm leaves a check that states plainly what it checks.

This is an Answer Or Refuse instance rather than a tidy-up. The dead arm contributes nothing and refuses nothing, so a cross-repository collision would now pass rather than be reported — the check passes over that population by never looking at it, which reads exactly like a population that was looked at and found clean.

# Evidence

Verified on 2026-08-28 against the tree as it stood.

`REPOS` is `["akasha", "code-editor"]`, scanned at module load from `pages/repo/*.repo.md`.

`rootsHere()` returns `{"akasha":"/var/home/walton/repos/akasha","code-editor":"/var/home/walton/repos/code-editor"}`. It carries no `instructions` key, so `rootsHere()[INSTRUCTIONS]` is `undefined`, so `stillLent` takes its `return []` branch unconditionally.

`stillLent` is the only reader of `tree.goneElsewhere()` in this file, and the only reader of the `canonicalize` and `trackedIn` imports at lines 5 and 8. All three exist solely to serve the dead arm.

Not measured: whether any other check carries an arm keyed on a repository that no longer exists.
