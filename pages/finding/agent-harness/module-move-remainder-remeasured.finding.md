---
id: cf479306-27f5-5909-9a36-fa4922bdeafd
slug: module-move-remainder-remeasured
page-type-slug: finding
title: "Module move remainder remeasured"
domain-slug: domain/agent-harness
---

# Claim

The move of fleet modules out of the code repository has a remaining set larger and differently shaped than the plan recorded for it, with `@agents/routing-core` the biggest piece and the two largest importers already correct.

# Evidence

Recorded from project #18836, the residual of #18768 with #18769 folded in, under the `harness-in-instructions` initiative. Owned by athena, left at `implementation` and untouched since 2026-08-12.

Two ends were wanted: every module the row touches either moves or names what keeps it in code, judged against the database, the object store and a model call; and nothing outside the agent packages imports a module deciding a seat, a message or a project.

The second was re-measured and the recorded plan was wrong in both directions. The measure names `@agents/*`, not `@agents/shared`, and the recorded 37 counted only the latter. At `846efe4cde`: 40 distinct `@agents/shared/*` excluding tests, 41 with them, and 59 across all `@agents/*`. Importers: `alanwalton` 115 files, `infra` 44, `stories` 12, `shared` 7.

The two largest need no work. `message-warrant` (16 importers) and `message-source` (12) each carry a `[Capability] binds` line naming a `public.messages` column, and `message-warrant` calls itself a projection of `domains/message-warrant.md`, checked rather than taken. That is 28 importers against a recorded reading that "the rest decide".

What was left and unblocked: `@agents/routing-core` at 10 — invisible to the old plan, exporting `decideSeatWake`, `decideWakeMatch`, `resolveResumePolicy`, `DormancyPolicy` and `ALAN_HANDLER_SEAT` into `daily-tracking`, the email watcher, `sms/core`, `sms/access` and web. Then `blocked-census` 4, `work-halt` 2 (deciding through `HALT_GATED_COMMANDS`, with no document behind it), `commit-agent-trailer` 1, `agent-kill-alert` 1.

Landed and live: `tools/seat-name.ts --read` in the instructions repo, and `39cd9c9e1c`, `5bb1fdf697`, `846efe4cde` in the code repo. Landed but not deployed: `e399bf96`, which re-points `isTerminalStatus` and `TERMINAL_PROJECT_STATUSES` off `project-binding` onto `projects-core/lib/project-transitions`, dropping outside importers of `project-binding` from 7 to 3.
