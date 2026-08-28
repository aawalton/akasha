---
id: 5e7daa3e-7a84-5654-a798-84c9c8b30faf
page-type-slug: finding
title: "The only check that finds a non-page under pages/ calls twelve sops sidecars non-pages too"
slug: the-non-page-check-calls-twelve-sops-sidecars-non-pages
domain-slug: domain/pages-system
---

# Claim

Under `pages/` there are 75,397 files: 58,899 pages, 16,496 sidecars, and 2 that are neither. `folder-matches-a-shape` is the only check that computes that complement, and it holds a sidecar test of its own — `isAttachmentFile || isRowsFile` — narrower than the eight shapes `page/sidecar/sidecar.ts` matches. So under `pages/` it names 13 files as neither a page nor a page's sidecar: 12 are sops sidecars of pages that exist, and 1 is real. It finds one of the two strays and invents twelve.

# Evidence

Measured 2026-08-28 on main. Population: a walk of `pages/` and `git ls-files` plus `--others` and `--ignored` over the same path both return 75,397 files, with no difference either way. Recogniser: `claimant` at `page/page-types.ts:356` over the 391 page types, then `pageOfSidecar` at `page/sidecar/sidecar.ts:15`. Control: `claimant` answers `finding` for `pages/finding/work-system/compressing-notes-destroys-the-corrections-in-them.finding.md` and "its name carries no page type" for `pages/initiative/formula-name-translations.md` — one call, differing in the path alone.

The two strays. `pages/initiative/formula-name-translations.md`, tracked. `pages/page-property-definition/page-type-named-for.page-property-definition.staged`, untracked, not ignored, byte-identical to the `.md` beside it.

The disagreement. `folder-matches-a-shape.check.code.attachment.ts:105` tests `isAttachmentFile(key) || isRowsFile(key)`, where `pageOfSidecar` matches eight shapes with `.sops.yaml` among them. Running the check gives 1,257 failures, 6 under `pages/`: `claude-account` (8 files), `cluster`, `royal-road-account`, `telnyx-account` and `temper-watcher-enrolment` (1 each) — all sops — and `pages/initiative`, the one true one. `git ls-files 'pages/*.sops.yaml'` returns exactly those 12, and `pageOfSidecar` resolves each to a page that is there.

It sees only the tracked tree. `foldersHere()` holds 2,234 files for `pages/page-property-definition` and not the `.staged`, so the untracked stray is in no population.

`pageOfSidecar` has one caller outside its own test: `move/move.ts`.

Not restated here: `md-only-guards-answer-for-non-pages` and `md-only-guards-are-more-than-eleven` list the guards answering for the tracked stray; `folder-matches-a-shape-is-off-by-a-ruling-and-cannot-be-turned-on-by-halves` records this check off on all three routes by a ruling; `compressing-notes-destroys-the-corrections-in-them` records that stray's stale content.
