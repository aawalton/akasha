---
id: aff022dd-1fb1-56c5-bacf-1bfbefa92bcd
page-type-slug: finding
title: "Active energy intent residue outlives its seam"
domain-slug: domain/alanwalton-app
---

# Claim

Commit `359379e00a` removed the sync-active-energy App Intent from `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh` and left two references behind. `ACTIVE_ENERGY_INTENT_MARKER` is still declared at line 400 and passed to the strip-to-EOF search at line 407, where it can match nothing; the AppShortcutsProvider comment at lines 1894-1895 still says the wallpaper and active-energy intents share the one provider, while the body under it registers wallpaper and stream-health-samples.

# Evidence

Read from `/var/home/walton/code` on 2026-08-08, at `f835592986`, fetched and level with `origin/main`.

`359379e00a` (2026-08-07, #18149, "the circle reads the samples, and every writer of the old daily scalar is retired") takes 420 lines out of `apply-ios-seam.sh`,.

`grep -n "ACTIVE_ENERGY"` over that script returns exactly two lines:

    400:ACTIVE_ENERGY_INTENT_MARKER='// ===== sync-active-energy app intent seam'
    407:FIRST_SEAM_LINE=$(grep -nF … -e "$ACTIVE_ENERGY_INTENT_MARKER" … "$APPDELEGATE" …)

Line 407 finds the first seam marker in the generated `AppDelegate.swift` so every seam below it can be stripped and re-appended. Nothing appends that marker now, so the term is dead weight in a search whose job is finding the earliest marker present.

The second site, lines 1894-1895, above the provider:

    # Exactly ONE AppShortcutsProvider may exist per app, so the wallpaper (§2b-vii) and active-energy
    # (§2b-viii-a) intents share this ONE provider rather than each declaring its own.

The emitted body directly below disagrees. Its guard at line 1902 is `if [[ "$WALLPAPER_INTENT_ENABLED" == "1" || "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]`, and the two `AppShortcut` entries it can write are `GetWallpaperIntent` and `StreamHealthSamplesIntent`. There is no `ACTIVE_ENERGY_INTENT_ENABLED`; the only two gate constants are `WALLPAPER_INTENT_ENABLED` at line 143 and `HEALTH_SAMPLES_INTENT_ENABLED` at line 160.

`rg -uuu -l "SyncActiveEnergyIntent"` over `~/code` returns two paths, neither the seam script: a `.git/worktrees` COMMIT_EDITMSG, and a fixture string in a checks unit test.

A reader of line 1894 learns the provider hosts an active-energy intent, goes looking, and finds the marker at 400 confirming it — two sites corroborating each other, both wrong, the code that disagrees sitting between them.

Found while ingesting `dirty/code/packages-alanwalton-native-shell-docs-native-seams.md`, whose App Intent section describes that intent as one of three.
