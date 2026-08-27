---
id: ef6be532-090a-51b5-9908-44164d410190
slug: sweep-skips-on-any-dirty-file
page-type-slug: finding
title: "Sweep skips on any dirty file"
domain-slug: domain/deploy
---

# Claim

A post-land sim sweep refuses to run whenever the mac checkout holds any uncommitted tracked change, and what it records is a skip rather than a deploy that went unmeasured. So one file left modified stops the sweep for every deploy after it, for as long as it sits there, while the deploy output a reader sees stays green.

# Evidence

THE PREDICATE. `decideSweepSkip` in `packages/alanwalton/mobile-cli/src/mobile/sim/sweep-window-guard.ts` skips whenever the mac tree reads `dirty`, which `parseMacTreeState` reports for ANY tracked entry in porcelain status — one file and a hundred are the same state, and neither the path nor its age narrows it.

THE SWEEP'S OWN LOGS NAME THAT GUARD. Four logs stand at `/tmp/shell-suite-postland-<seq>.log`, for #19287, #19302, #19338 and #19339, and each ends in the reason string that function composes: `mac checkout has 1 uncommitted tracked change(s) — an in-flight branch build holds the window`, naming `packages/smilingjenny/native-shell/www/index.html`. So the guard is git dirtiness read over ssh, and four sweeps were skipped rather than three. That a checkout with this file dirty still fast-forwards is not counter-evidence: git declines only where an incoming commit touches the file, which is a different predicate.

WHY IT WENT UNNOTICED. Every one of those four lines reads `(exit 0, no alert)`. The sweep is spawned detached with its output going to that log, so the deploy prints the same thing whether the sweep ran, passed or refused, and the four deploys reported clean.

WHAT THE FILE IS. Not a build artifact. Committed, it is a hand-written boot page titled `Smiling Jenny`; the working copy on the mac is Alan's SPA, titled `Alan Walton`, beside 51 entries under that directory, stamped 2026-08-13 23:08. The dirty tree was reporting a real fault, and untracking the path to clear the sweep would have hidden it.

AN UNREADABLE PROBE IS NOT A SKIP. `parseMacTreeState` returns `unknown` when the ssh probe fails or will not parse, and `decideSweepSkip` has no arm for it, so it falls through to `skip: false` — the sweep runs when it cannot see the mac tree and refuses when it can.
