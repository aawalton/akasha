---
id: 794aa1e3-e964-5731-bfa5-2cd83a575cfd
slug: attendance-value-unnamed
page-type-slug: finding
title: "Attendance value unnamed"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17283 (domain: seat-mode) found the attended-seat predicate ("human can reach this seat in-band") is already computed correctly by `resolveRemoteControlDefault` (`supervisor-remote-control-default.ts:4-17`) but spelled only as a side effect threaded to the RC arg/env block, with no name or home of its own; must land first, since #17282's other children all assert against attendance and none can be written against an unnamed value.

# Evidence

Project #17283 (domain: seat-mode, status: someday_maybe, live-on: deploy); never defined, moved off the retired `notes` attribute on 2026-08-15. Child of #17282; must land before #17282's other children (re-keying detector sites, mechanical guard, question detector), none of which can be written against a value with no spelling.

Exploration: `resolveRemoteControlDefault` (`supervisor-remote-control-default.ts:4-17`) already computes the right predicate — interactive session OR headless persona, i.e. "a human can reach this seat in-band" — and threads it only to the RC arg and RC env block, nothing else. The value exists, is correct, and is spelled as a side effect of a different feature.

Success criteria:
1. One name, used everywhere: a single resolved value answers "is a human attending this session in-band." Not `headless`, not `sessionKind`, not `remoteControlAtStartup`; does not reuse `unattended` (already taken per the parent's 15-term vocabulary census).
2. LIVE, not launch-time: reflects current session state; a seat that becomes attended reads attended on the same process, without relaunch.
3. `bun ops seat whoami` reports it. `whoami` today returns `id`/`name`/`role`/`domain`/`persona`, not even `sessionKind`.
4. `sessionKind` resolved, not left alongside: written only at row creation (`supervisor-interactive-boot.ts:159`, `helper-lifecycle.ts:157`), no update path; 5081 of 8439 rows lack it; every consumer coerces absence to `"headless"` (`restart-recovery.ts:200`), reopening #14044's orphaned-terminal defect. Either it gains an update path and a meaning distinct from attendance, or is retired and its five consumers move.
5. Absence of a determination is distinguishable from a determination of `false` — same rule `whoami` already applies to identity: `null` = nothing determined, `unknown` = nothing classified.

Not in scope: what any consumer decides with the value (a sibling child). This child only names, stores, makes live, exposes it.
