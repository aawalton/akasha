---
id: ac0b2aa8-388f-53d2-98b1-05c06c96fdde
slug: deploy-restarts-past-the-document
page-type-slug: finding
title: "One deploy path restarts a workstation service by a unit name spelled beside it, past its document"
domain-slug: page-type/workstation-service
---

# Claim

Every command now controls a workstation service through its document, but one deploy path does not: `move-to-watcher.ts` in the code repository restarts `temper-watcher` by a unit name spelled beside it, so a deploy stops and starts a service without its document being read.

# Evidence

Measured 2026-08-19, closing the `services-run-from-their-documents` initiative.

`ops temper watcher start`, `stop` and `restart` are removed, and `ops service restart` stands beside `start` and `stop`, all three reading `domains/services/*.md` and refusing a name no document carries. Checked live: `ops service stop temper-watcher` took the unit to inactive, `start` returned it to active, `restart` replaced it, and `ops temper watcher status` reported the new pid each time.

What remains is not a command. `packages/alanwalton/projects/cli/src/lib/move-to-watcher.ts:54` calls `restartUnit()`, imported from `@temper/watcher-cli/temper/watcher/systemd`, which acts on `WATCHER_UNIT = "temper-watcher.service"` declared at `systemd.ts:3`. A deploy fast-forwarding source into `~/repos/code` restarts the watcher this way so it picks the source up. `startUnit` and `stopUnit` beside it had no caller left and are removed; `restartUnit` and `isUnitActive` stay because this is what holds them.

The direction makes the obvious repair wrong. The dependency between the repositories runs instructions to code, through `codeModule`. Reaching `ops service restart` from here would invert that, and having the code repository read `domains/services/*.md` would make a code-repository module's behaviour turn on what stands in another repository.

So one service is still restarted by a name spelled in two places, and the second spelling sits where nothing about the service documents can reach it.

Not measured: whether any other deploy or supervisor path in the code repository acts on a workstation service unit by name — only `temper-watcher` and `wake-watcher` were looked at, and `wake-watcher.service` in `move-to-wake-watcher.ts` carries no document under `domains/services/` at all.
