---
id: 16fa4843-22e7-5946-b48a-b9e35edf8242
slug: prepare-window-fix-ships-worse-bug
page-type-slug: finding
title: "Prepare window fix ships worse bug"
domain-slug: domain/reader
---

# Claim

The mini-player-bar's audio-prepare-window fix coupled its transport-disable state to `isWaiting`, a flag derived purely from event edges that latches permanently on a single spurious `stalled` network event during otherwise-uninterrupted playback, so it can leave the pause button disabled for the rest of a session — trading the lying-but-clickable button it fixed for a dead one.

# Evidence

Project #16091, domain `reader`. Child of #15906, split because the work landed on branch `project-15906b`, which the pre-receive hook rejects as a non-seq name. No objective; notes only.

DEFECT FIXED: `mini-player-bar.tsx` destructured only `{state, isPaused, seekBy, togglePlay}`, never `isWaiting`/`downloadFraction`, so its transport rendered purely off `isPaused` — seeding true, showing an inviting Play icon through the whole audio-prepare window, and #15906's crash guard turned that tap into a silent no-op. Alan's complaint verbatim: "click the play audio option, then nothing happens."

ASYMMETRY: the in-page "Generating audio…"/"Downloading voice…" affordance only shows on the owning chapter page (`isActivePage`); the mini-player is visible everywhere, so off that page there was no waiting signal.

FIX SHIPPED: while `isWaiting`, transport disabled with spinning `Loader2`, `aria-label` becomes wait text, `aria-pressed` drops to `undefined`, wait text under the title (copy from the in-page panel). Tests: 7 pass/4 fail reverted (failures = new tests), 11 pass/0 fail restored. Also fixed a `sessionStorage` test leak. PROVENANCE: worker-15906b wrote the edits, torn down uncommitted; worker-15906c found them on disk, committed unreviewed first so a third teardown couldn't lose them, then verified.

LAND-REVIEW VERDICT (`origin/project-16091` @ `c0bf0d4af2`): DO NOT LAND AS PUSHED — the UI work is good but the predicate ships a worse bug than the one it fixes. `isWaiting` derives purely from event edges (#16157): a spurious `stalled` network event during uninterrupted playback sets it permanently, since `canplay`/`playing` never re-fire through playback that never stopped. Coupling `disabled` to it means the user cannot pause for the session — worker-15906c proved the latch deterministically, then shipped a change depending on the flag it had disproved.

The review broke off in the row's notes before a full blocker list or remedy was recorded.
