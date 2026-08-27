---
id: 9300966c-652c-58b5-a315-32db0766fd88
page-type-slug: finding
title: "Packages agents inventory open"
domain-slug: domain/agent-harness
---

# Claim

In agent-harness, under initiative harness-in-instructions, project #19215 was opened 2026-08-15 on Alan's ruling that much of `packages/agents/**` should not be in the code repository, but stands with no objective written; the supervisor is already fully out (#19156, `fb55503cf32f`), leaving a hand-counted inventory of about 1,718 source files across seven areas still untested against the one criterion that would move each.

# Evidence

Project #19215 (initiative harness-in-instructions), agent-harness, status awaiting_lead_definition. No objective is written; the notes are the observation.

Alan opened this 2026-08-15: much of `packages/agents/**` should not be in the code repository; he believed some already was. Live front of harness-in-instructions objective two, UNDEFINED — no criterion written. Test per package: name the database, process, network call or platform tie keeping it there; none found, it moves.

2026-08-15: supervisor is OUT of the code repository — #19156 landed at `fb55503cf32f`, main pipeline 28066 green, 119 files deleted, 26,398 lines gone. Verified on disk: three launcher files gone; no module under `packages/agents/` spawns a Claude process; `restart`/`reset`/`route` import instructions-side replacements; every live supervisor runs `~/instructions/tools/run-supervisor.ts`. Entry point still crosses twice into `packages/agents/shared`: `setAgentName` (`db-agent-rename.ts`, closes with #18891) and `watchSessionFile` (`lib-watch.ts`, held by the object store, settled to stay) — remove either and no seat boots. `domains/folders/agent-runtime.md` is removed on Alan's ruling; its Seat Or Supervisor principle settled a split that no longer exists.

Hand-counted inventory, 2026-08-15, source files excluding tests (a reading, not standing): oauth+oauth-proxy ~221; supervisor ~260; shared ~575; cli ~299 (deployed half of `ops agent`); instructions/instruction-document/instruction-reload/instruction-surface ~233; routing-core ~58; messages ~12; devops-monitor/infra-alert-bridge/main-pipeline-alert ~60 — total ~1,718. Same test applies to each; `shared`'s object-store watch has one, `ops agent`'s deployed half mostly does not.

Separate thread, not this row's: Allow By Default is live, stabilization watch armed, no true refusal observed. Ryn reported two findings on `seat-turn-end` and three possibly-overtaken projects — #18745, #18898, #18751 — undefined, left for Alan to define or cancel.
