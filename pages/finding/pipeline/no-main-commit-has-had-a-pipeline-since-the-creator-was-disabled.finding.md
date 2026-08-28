---
page-type-slug: finding
slug: no-main-commit-has-had-a-pipeline-since-the-creator-was-disabled
title: "The service that gives every main commit its pipeline has been off since 2026-08-22 because its own document says enabled false"
domain-slug: page-type/pipeline
---

# Claim

No commit landing on main has been given a pipeline since 2026-08-22T21:37:32Z. The service that does that is off, and its own document is why: it carries `enabled: false`, and the page type makes the document the only thing that settles whether a workstation service runs.

Nothing here is broken. The service stopped cleanly, reports success, has never been restarted since, and its systemd unit is not installed at all, so a reboot will not bring it back. Somebody decided this, six days ago.

What made the gap hard to see is that the branch half of CI went on working. Branch pipelines were still being placed on 2026-08-25, and the step dispatcher has been healthy throughout — idle rather than failing, scanning nothing because nothing was queueing work for it. An observer watching CI would have seen it running.

The consequence reaches further than CI. A commit that repairs something on the cluster cannot reach the cluster from main while this stands, however healthy everything downstream of it is.

Whether it should be turned back on is not settled here, and the reading argues against assuming. The flag was set deliberately, and this repository cannot say by whom or why: the document arrived in one migration commit, so its earlier history is in the repository it came from. Setting it true would start a pipeline for every commit landing on main across the whole tree. That is a decision, not a repair.

# Evidence

Read and run on 2026-08-28 against `b874a50c5` on `main`. Every reading is from the record — systemd state, the service journal, the document, and git. Nothing was started, enabled, deployed or triggered to produce any of it.

**The service is off, and its document is the authority saying so.** `systemctl --user show main-pipeline-creator` gives `ActiveState=inactive`, `SubState=dead`, `Result=success`, `NRestarts=0`, and an empty `ActiveEnterTimestamp`. `systemctl --user is-enabled main-pipeline-creator` answers `not-found` — the unit is not installed, so no reboot restores it. `pages/workstation-service/main-pipeline-creator.workstation-service.md:11` carries `enabled: false`, under a Definition at `:17` reading "the service that gives every commit landing on main its pipeline". `pages/page-type/workstation-service.page-type.md:28` — "A workstation service's document settles whether it runs, what code it runs, its unit, and how the cluster reaches it" — and `:34` — "A workstation service is started and stopped from its document alone." So the installed state and the declared state agree, and both say off.

**It was stopped cleanly, not lost.** Its journal's last four lifecycle lines are `2026-08-22T12:49:38-06:00 Started`, `2026-08-22T15:18:54-06:00 Started`, `2026-08-22T15:37:32-06:00 Stopping main-pipeline-creator.service...`, `2026-08-22T15:37:32-06:00 Stopped main-pipeline-creator.service.` Nothing follows. `Result=success` and `NRestarts=0` agree with a deliberate stop rather than a fault.

**The branch half of CI kept working, which is why this was invisible.** `journalctl --user -u ci-container-dispatcher.service` shows it placing work as late as `2026-08-25T19` — `placement bind pipelineSeq=93 pipelineBranch=change-19482 stepSeq=13024`, and `placement defer` lines for `pipelineSeq=98 pipelineBranch=change-19483`. Both are change branches. Counting its `tick scanned=` lines by hour gives 86 in `2026-08-25T18`, 30 in `2026-08-25T19`, and **none after**, through to a restart at `2026-08-28T02:26`. It logs a tick only where it has work, so that is `scanned=0` throughout: the dispatcher is idle rather than broken.

**Its restarts are the wrapper, not crashes.** The journal's restart lines each pair with one of the shape `[wrapper ci-container-dispatcher] tools/lib/ci-container-dispatcher/container-manifest.ts moved; restarting so it runs on what stands`, and `page/index/place/place.ts moved; …`, and `tools/page/page-value.ts moved; …`. That is `pages/page-type/workstation-service.page-type.md:18` working as written — "Every workstation service runs under one wrapper, which restarts it when a file it reaches changes." The accompanying `Main process exited, code=exited, status=79` is that wrapper's own stop. A restart counter in the hundreds on this service is not evidence of a fault.

**The reach is beyond CI.** `f4923de65` (2026-08-27 16:34:13 -0600) points the orchestrator cache at akasha instead of an emptied `code.git`, and is recorded in `pages/finding/page-queries-system/a-ready-endpointslice-hides-the-deleted-service-from-every-reader.finding.md` as what stands between a deployed app pod and a checkout reset against an emptied repository. It is committed to main and has not been applied. While this service is off, no commit on main gets a pipeline, so it cannot ship by the ordinary route however healthy anything downstream is.

**Two bounds I could not close.** First, three `web` ReplicaSets exist in namespace `alanwalton` at `2026-08-25T13:05:25Z`, `2026-08-25T15:07:51Z` and `2026-08-26T00:36:43Z`, all after this service stopped. Something deployed by a route that is not a main pipeline; `ops deploy` exists as a command and is the obvious candidate, and I did not chase it or run it. Second, and more important: `git log -- pages/workstation-service/main-pipeline-creator.workstation-service.md` returns exactly one commit, `85a0bd288` (2026-08-27 01:39:40 -0600, "The pages land in akasha (batch 9)"), and `git log -S"enabled: false"` on that path returns the same one. The flag arrived with the migration, so who set it, when and why stands in the repository the pages came from and cannot be dated here.

**Which is why turning it on is not a repair.** The flag was set deliberately by someone this repository cannot name, and setting it true starts a pipeline for every commit landing on main across the whole tree. A reader who finds this page while chasing a stuck deploy has enough to explain the stall and not enough to reverse it, and reversing it on that basis would be acting on a decision they have not read.
