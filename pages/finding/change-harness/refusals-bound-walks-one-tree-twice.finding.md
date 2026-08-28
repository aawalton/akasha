---
id: 12ec0506-90bc-4b2a-9c1f-14600621111c
slug: refusals-bound-walks-one-tree-twice
page-type-slug: finding
title: "Refusals bound walks one tree twice"
domain-slug: domain/change-harness
---

# Claim

`tools/audits/refusals-bound.ts:102` walks a second tree taken from `resolveRoots()[AKASHA]`, imported there under the alias `SIBLING`. It is the same directory the check was already handed, so every file is read twice: each finding is reported twice and the printer count is doubled.

In the fixture suite that second tree is the live repository instead, so its findings decide the verdict of every case. Dropping it turns `tools/tests/refusals-bound.test.ts` green, 21 of 21.

# Evidence

Measured 2026-08-28 against akasha at `922b6dc`. The check reports 157 refusal documents against 104 instruments, with 22 messages naming a call whose slug cannot be read. A copy with the second tree removed and nothing else changed reports 157 against 52, with 7 such messages. The 24 messages naming an unprinted document are the same in both, being counted outside the tree loop.

`resolveRoots()` answers `akasha: /var/home/walton/repos/akasha`, and `AKASHA` is the string `akasha`, both run directly, so the two trees are one path.

The suite against that same copy: 21 pass, 0 fail. Against the check as it stands: 9 pass, 12 fail, and all twelve failures are cases asserting `pass`. This settles what `refusals-bound-refuses-cases-it-states-as-passing` left open as `why the seven others refuse is not settled here`.

That finding also reports the absent-document message naming a path with no page-type suffix. Checked, and no longer true: the message now reads `pages/refusal/refusal-slug-not-literal.refusal.md is not there`, `tools/lib/refusal.ts` having been merged into `refusal/refusal.ts`.
