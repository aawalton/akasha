---
id: 3a4bb480-11bb-53c2-987f-12d0659eb50b
slug: headless-deaths-single-site
page-type-slug: finding
title: "Headless deaths single site"
domain-slug: domain/global
---

# Claim

Death detection for a headless `worker-`, `project-` or `deliver-` seat rests on one of the three sites that write an `agent.exit` record, and the deaths it misses cannot be counted. The wake-watcher never resolves such a row, those seats being absent from its assembled specs; the boot reconcile needs the spawning supervisor to boot again, which a manager retiring at project end never does. Only `child-exit` reaches them, and a death no site observes leaves no artefact to count.

# Evidence

The three write sites are `recordStaleLiveDeath` in `wake-watcher-daemon.ts:280` (`stale-live`), `recordCrashedChild` in `supervisor-child-reconcile.ts` (`boot-reconcile`), and `writeChildCrash` in `supervisor-child-crash-write.ts` (`child-exit`). `ExitSiteZ` at `agent-exit-event.ts:66` enumerates exactly those three.

**The wake-watcher cannot reach these seats.** `wake-watcher-registry.ts:49` resolves rows through `assembleArmedSpecs` from `@agents/routing-core`. `wake-armed-seats.ts:125` declares `DECLARED_SPECS` as `IRIS_SPEC`, `ARIA_STAGED_SPEC` and `SMS_ENTRY_POINT_SPECS`, with per-persona seats added by `seatedPersonaSpec`. No `worker-`, `project-` or `deliver-` prefix appears in that file. A seat absent from the assembled specs is inert to the watcher, so `stale-live` never fires for one.

**The boot reconcile cannot reach them either.** It runs when the spawning supervisor boots again, and a manager that retires at project end does not boot again, so the reconcile that would have found its dropped children never runs.

**The gap has no denominator.** `agent-exit-reading.ts` reports `recorded`, `unreadable`, `coverage` and its scope, and its own comment states that `recorded` counts deaths some site observed rather than deaths that occurred. A death no site observed produces no row and no crumb, so it is absent from the count exactly as a death that did not happen is absent. `coverage=truncated` reports a page filling; nothing reports this.

A narrower hole sits under the same mechanism: only a seat launched through `launchDetachedSupervisor` has a spawn-state file, so an interactive `pty-proxy` seat's wrapper has nowhere to leave an exit crumb. `spawn-state-exit-stamp.ts:26-29` documents that hole and calls it a missing writer rather than a missing decision.

Filed because the observation survives only in `dirty/knowledge/exit-forensics.md`, which is queued for removal, and because it is not an instruction: there is no act to specify, only a fact about what the fleet cannot see.
