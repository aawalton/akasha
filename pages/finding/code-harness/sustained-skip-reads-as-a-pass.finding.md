---
id: 5ecce6a3-700e-545f-ad92-de3ccbf9168b
page-type-slug: finding
title: "The nightly sim suite skipped three consecutive nights at exit 0, so a sustained skip reads as a pass"
domain-slug: domain/global
---

# Claim

The nightly sim suite skipped three consecutive nights on a held build window and reported exit 0 each time, so a sustained skip is indistinguishable from a pass at the only place anyone reads it.

# Evidence

`tools/commands/mobile/sim/sweep.ts:157` writes "mac/sim build window held — skipping install+suite (exit 0, no alert)" and returns 0. Its own help at :49 states the design: a napping mac and a held window both skip silently, and only a post-boot failure alerts.

`journalctl --user -u mobile-sim-suite.service` shows that path taken on 2026-08-15 03:20, 2026-08-16 03:20 and 2026-08-17 03:20, each with the same reason — the mac checkout carrying one uncommitted tracked change, `packages/smilingjenny/native-shell/www/index.html`. Each run finished clean and the unit reported success, so three nights produced no reading and nothing said so.

On 2026-08-18 03:20 the window cleared, the suite ran, and `keyboard-geometry` failed twice consecutively: `undefined is not an object (evaluating 'document.querySelectorAll("textarea")[0].id = "kbLine"')`. The retry guard for the cold-load race at #15738 fired and the failure reproduced, so it is not that race.

Which night that regression arrived cannot be recovered. The three runs between the last real reading and this one reported green without looking, so the suite's own history cannot distinguish a fault that landed on the 15th from one that landed on the 17th.

The napping-mac case and the held-window case are one branch here but differ in kind. A mac that is asleep tonight is likely awake tomorrow. A dirty checkout persists until somebody clears it, and nothing in the sweep notices that the same reason has held for three runs.

Separately, the alert on the failing run read "primary alert to astra failed (exit 1); falling back to dalla". `ops seat list` shows no seat named astra, so the primary leg of that route has no recipient.
