---
id: 19720327-f24d-517f-888c-1624ca4c7d95
page-type-slug: finding
title: "Systemd land drift window"
domain-slug: host/workstation
---

# Claim

In the workstation domain, a freshly landed systemd --user unit declared enabled in units-enabled.txt is not linked/enabled live until the next reconcile cadence runs, leaving a drift window in which the symlink-integrity and enablement-conformance detectors (#15673) fire stale alerts before self-healing; two 2026-07-24 instances (#15789, #15794) both self-healed via the cadence without a hand reconcile.

# Evidence

Source: project #15806 (someday_maybe, live-on deploy, domain workstation), captured notes only, no objective, moved off the retired `notes` attribute 2026-08-15. Owner athena — harness/dotfiles + deploy post-land reconcile. Marked "unsettled exploration, capture-only, non-urgent."

Pattern seen twice 2026-07-24: a freshly-landed systemd --user unit, declared enabled with repo unit files present, is not linked/enabled live — stranded until a reconcile runs. Instances: #15789 cardio-ingest (self-healed ~08:45) and #15794 temper-watcher-liveness (still stranded ~09:00; athena hand-reconciled: ln -s both units + daemon-reload + enable --now). The drift detectors (agent-reap symlink-integrity + enablement-conformance, #15673) correctly catch it, but resolution was manual/cadence-based, producing repeated stale alerts on every systemd-unit land.

Explore question raised: should an automatic post-land reconcile run setup-symlinks.sh (relink) and enable_if_declared whenever a land touches packages/shared/dotfiles/.config/systemd/user/** or units-enabled.txt, closing the window at the earliest seam? Options weighed: a deploy postLandReconcile hook vs a workstation watcher (mind the settings.json-class clobber risk: relink must not overwrite a plain-file config with fresh in-app content).

Pinned refs: packages/shared/dotfiles/setup-symlinks.sh, provision-workstation.sh (enable_if_declared), .config/systemd/user/units-enabled.txt, #15673.

Correction (2026-07-24T15:18): both instances ultimately self-healed; the manual ln/enable on #15794 were harmless no-ops — by ~09:10 the symlinks existed and the timer was active. The gap is not a failure to reconcile (it runs); it is the window between land and the next tick, during which detectors fire stale alerts and the unit is briefly stranded. Fix direction: shorten/close that window with a prompt post-land reconcile.
