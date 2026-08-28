---
id: c238bf47-b95d-5dd1-9119-4fe42b7587fe
slug: quarantined-doc-references-dangle
page-type-slug: finding
title: "Quarantined doc references dangle"
domain-slug: repo/akasha-repo
---

# Claim

Sixty-eight comments across forty-three source files in the code repo direct a reader to `docs/…` paths that no longer exist there. The estate quarantine moved every instruction surface out on 2026-08-03 and the comments pointing at them stayed behind. The reference reads as live: nothing in `See docs/native-seams.md` says the file left, so a reader follows it, finds nothing, and cannot tell a moved document from one that never existed.

# Evidence

Measured against `origin/main` at `a6287feba4` on 2026-08-06, from `/home/walton/code`:

    git grep -rn "See docs/\|see docs/" -- packages/   → 68 lines
    git grep -rln "See docs/\|see docs/" -- packages/  → 43 files
    git ls-files -- 'packages/**/docs/**'              → 3 files remain

The class spans packages that share nothing but the repo: `packages/agents/oauth/src/oauth-at-limit-expiry.ts:37` names `docs/429-rebind.md`, `editor-extension/src/features/status-bar/render.ts:126` names `docs/feature-status-bar.md`, and `packages/alanwalton/awen/core/src/gm-boot-sections.ts` names `docs/loremaker.md` twice.

The cause is commit `7205e28efd` (#17583, 2026-08-03), which moved 1,125 markdown files — every `CLAUDE.md` and everything under `docs/`, `.claude/` and `spec/` — into `instructions/dirty/code/`, excluding `packages/books/`. Its own message states that nothing in the code repo carries agent instructions afterwards.

Two instances sit in `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh` at lines 142 and 173, naming `docs/native-seams.md` and `docs/active-energy-intent.md`. Both targets return zero from `git ls-tree -r --name-only origin/main`. They were found by the developer on #17349 while editing that file for an unrelated removal, and were left alone: repairing two of sixty-eight would leave the class intact while making it look addressed.

The instruction each comment names does still exist, under `dirty/` in the instructions repo, where `domains/retired/quarantined.md` defines it as binding nobody and where it awaits triage. So the target a comment should name depends on what triage decides, and no rewrite available today is certain to still be right afterwards.
