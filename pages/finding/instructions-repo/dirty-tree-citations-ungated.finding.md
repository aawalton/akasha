---
id: 6146561e-06f6-5096-a21e-fe5b84b41986
page-type-slug: finding
title: "Dirty tree citations ungated"
domain-slug: repo/instructions-repo
---

# Claim

The move of every persona file under `domains/` stranded two citations of the old paths inside `dirty/`, where no gate can reach them: `read-what-governs` reports that nothing governs that tree at all.

# Evidence

Measured 2026-08-06, verifying a reading's claim that one line in `domains/tasks/persona-craft/create-persona-register.md` was the last old persona path left. That claim is right about the perimeter — a search of the whole repository returns nothing of the old shape under `domains/` outside `domains/personas/`. It returns three sites elsewhere.

Two are live citations of paths that no longer exist. `ls personas` returns "No such file or directory"; commit `7ad0df46` moved the tree under `domains/` on 2026-08-05.

- `dirty/questions/unranked-claims.md:17` — `[personas/atlas.md](../../personas/atlas.md)`, which resolves from `dirty/questions/` to `personas/atlas.md` at the repository root.
- `dirty/questions/quarantined-domains.md:15` — the same link, same resolution.

The third, `tools/tests/remaining.test.ts:157`, is a synthetic fixture path naming no real file, and not a defect.

Why nothing caught it: `ops instructions run-gates --file-path dirty/questions/unranked-claims.md` returns `[read-what-governs] pass — nothing governs this path, so there is nothing to have read`. With no governing surface there is nothing for `links-resolve` to check against, and on that run it returned `not-applicable`.

Why this is filed rather than repaired: a `dirty/` question document is a record of a reading taken at a stated commit — both cite blob SHAs for the trees they were read from. A link inside such a record may be correct as a record of where the file stood, and repointing it would falsify that. Nothing says whether these are records frozen at their reading or live surfaces whose citations should track the corpus.

Not established: whether `links-resolve` would fire here if the file had been read. `read-before-write` failed on the same run, so the two could not be separated.
