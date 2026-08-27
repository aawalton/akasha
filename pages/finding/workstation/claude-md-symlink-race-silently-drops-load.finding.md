---
id: ea737798-4a64-5df1-86f3-892025f14270
page-type-slug: finding
title: "Claude MD symlink race silently drops load"
domain-slug: host/workstation
---

# Claim

`link()` in `setup-symlinks.sh` removes the stale symlink before creating the new one, leaving a window where the link does not exist; for `~/.claude/CLAUDE.md` specifically that window makes Claude Code load no Global Principles silently (exit 0, empty stderr), and a proven atomic fix (temp-name + `mv -T`) already exists from #16279's targeted reimplementation.

# Evidence

Project #16331 (domain: workstation, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

Found by the #16279 worker diffing its reimplementation against `link()`, at the filer's instruction; it declined to fix this inside its gated project, routing rather than widening scope.

Defect: `link()` in `setup-symlinks.sh` removes the stale symlink then creates the new one — no atomic swap; between the two commands the link does not exist.

Matters for one of twelve links: `~/.claude/CLAUDE.md`. A symlink that doesn't resolve makes Claude Code load NO Global Principles, silently — exit 0, empty stderr, the file absent from the loaded-files list (observed by the #16279 worker). A session in that window boots with no doctrine and no signal. Window opens only during rare manual runs — a follow-up, not an emergency.

A proven fix exists: the #16279 worker's relink builds the new link under a temp name and swaps with `mv -T` (`rename(2)`, atomic) — a reader sees the old link or the new one, never nothing. It preserves `link()`'s real-file backup guard (verified reading content out of `.bak`). Worth lifting into `link()` to fix all twelve links at once.

Other load-bearing property, from the worker's 7-property enumeration of `link()`: the early-return when the link is already correct — an implementation that unlinks/recreates every run passes every end-state test and still opens the window. Verify early-return by INODE (plus mtime/ctime), never the function's own "already correct" output.

Why a row: shared provisioning code sits behind twelve links; a mistake there outweighs the microsecond it closes; unrelated to the worker's own renaming task — correct scope discipline, but the finding shouldn't die with the project that surfaced it.

Not dispatched: fleet capacity gate closed at filing (deployment 3 + verification_automated 3 = 6, needs <5; checks 9 + implementation 1 = 10, needs <10).
