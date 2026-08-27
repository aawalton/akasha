---
id: 162bc246-7e74-5a1d-af35-276b286e9459
page-type-slug: finding
title: "Personas docs cited after removal"
domain-slug: domain/alanwalton-app
---

# Claim

Sixty-one tracked live files under `packages/alanwalton/personas/` cite package documentation by relative `docs/<name>.md` path, and that package's `docs/` directory holds zero tracked files. Ten names are cited and none resolves in `~/code`; `persona-storage-tiers.md`, cited by 42 of those files, resolves nowhere in any repo including under quarantine. The citations are ordinary docblock prose, so nothing pins them and no gate reports them.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-personas-docs-image-locator.md`.

Directory: `git ls-files "packages/alanwalton/personas/docs/"` returns 0 tracked files.

Citers: `rg -l "docs/[a-z0-9-]+\.md"` over `packages/alanwalton/personas` returns 62 files across 64 lines. One is a test fixture rather than a citation — `cli/src/persona/framework-resolve.unit.test.ts` uses the literal `docs/a.md` as a `readsOnLoad` value — leaving 61, all confirmed tracked with `git ls-files --error-unmatch`.

Names cited, with citer counts: `persona-storage-tiers` (42), `reward-concept-queue` (7), `level-rewards` (5), `anchor-cover` (2), and `image-locator`, `levels`, `packages`, `persona-roster`, `voice-separation`, `wallpaper-backfill` (1 each).

Resolution: `git ls-files "*docs/<name>.md"` returns 0 in `~/code` for all ten. Three resolve nowhere in any repo — `persona-storage-tiers`, `levels`, `persona-roster` — searched by filename across `~/instructions` and `~/code` including `dirty/` and `dirty/maybe-keep/`. The 42-citer case is among these three. Five stand only under `dirty/code/` and are queued for removal; `anchor-cover` stands only as an earlier seat's keep at `dirty/maybe-keep/code/packages-alanwalton-personas-docs-anchor-cover.md`, so checking `dirty/code/` alone reports it gone — a false absence worth naming.

Nothing refuses it. `ops enforcement list` names no gate over documentation paths cited from code, and the instructions repo's `[links]` and `[mentions]` gates cover that repo rather than `~/code`.

Adds to `pages/finding/alanwalton-app/package-docs-cited-by-path-after-removal.finding.md` rather than repeating it. That finding was opened and read: it measures six files across nineteen lines in `native-shell`, `mobile-cli` and `apns-sender`. It does not reach `personas/`, a fourth such directory carrying ten times the citers of those three together.
