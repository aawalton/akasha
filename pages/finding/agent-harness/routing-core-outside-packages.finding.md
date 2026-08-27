---
id: 96a365fa-c2ae-52ee-b9bd-9510d5c974b5
page-type-slug: finding
title: "Routing core outside packages"
domain-slug: domain/agent-harness
---

# Claim

In agent-harness, modules outside `packages/agents` still decide from a seat, message or project row directly rather than importing only a database, object-store or model-call module. The largest is `@agents/routing-core`, whose seat-deciding exports were invisible to the original migration plan, and `work-halt` decides through `HALT_GATED_COMMANDS` with no document behind it.

# Evidence

Project #18898 (initiative: harness-in-instructions; status awaiting_worker_seat), agent-harness. Objectives: (1) nothing outside `packages/agents` reads a seat, message or project decision from them, measured over `from "@agents/..."` outside `packages/agents`, what remains imports only a database, object-store or model-call module; (2) every module touched either moves or names what keeps it in code, measured by reading each remaining module's warrant against those three.

#18836's unstarted remainder, homed here 2026-08-12 at Alan's direction to wrap that row on what it had landed; nothing was attempted and failed, it was measured and not begun.

Population at commit `846efe4cde`: `@agents/routing-core` — 10 importers (`daily-tracking`, email watcher, `sms/core`, `sms/access`, web), exporting `decideSeatWake`, `decideWakeMatch`, `resolveResumePolicy`, `DormancyPolicy`, `ALAN_HANDLER_SEAT`. Then `blocked-census` (4), `work-halt` (2), `commit-agent-trailer` (1), `agent-kill-alert` (1). `routing-core` was invisible to the original plan, which measured `@agents/shared` alone, not `@agents/*`. `work-halt` decides through `HALT_GATED_COMMANDS`, undocumented.

Excluded: `project-binding` (seat-name grammar, terminal-status rule) is #18891's; liveness cluster is #18897 behind #18892; instruction-document cluster (`@agents/instruction-document` 14, `doctrine-path-citations` 4, `source-position-citations` 1) is #18537's; `message-warrant` (16) and `message-source` (12) need no work, each naming a `public.messages` column.

Inherited from #18836: denominator is 59 importers across `@agents/*`, not 37 as an earlier plan recorded over `@agents/shared`; a byte-equivalent second copy of a rule failed `Single Authority` and was removed from `project-binding` for `projects-core`.

Traps: `check-ast-unused` refuses an export reached from no entry, needing client and caller in one commit; typecheck resolves through built `.d.ts`, needing `npx tsc -b` on any changed package; a digest suite needs `INSTRUCTIONS_ROOT` at an empty directory, the CI condition.
