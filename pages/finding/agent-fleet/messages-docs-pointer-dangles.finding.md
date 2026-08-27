---
id: dbbea270-86ab-5ac3-9c46-ab5910aaa448
page-type-slug: finding
title: "Messages docs pointer dangles"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/messages/docs/` does not exist in the code repo, and `supervisor-resume-decide.ts:38` still routes a reader into it — "See `packages/agents/messages/docs/delivery-observation.md`." It is the sole surviving pointer at that tree, and it falls outside the standing dangling-pointer findings, both of which are scoped to `packages/agents/supervisor/docs/`. A repair driven by those would fix fifteen pointers and leave this one.

# Evidence

Read against `~/code` on 2026-08-07.

`git ls-files packages/agents/messages/` returns nine paths — `lib/agent-id.ts`, `lib/console-stdout-guard.ts`, `mcp.ts`, `package.json`, `tools/agent-tools.ts`, `tools/agent-tools.unit.test.ts`, `tools/delivery-witness.ts`, `tools/delivery-witness.unit.test.ts`, `tsconfig.json`. There is no `docs/`.

`rg -uuu -n "delivery-observation"` over `~/code`, excluding `dist`, `build`, `node_modules` and `.git`, returns exactly one line: `packages/agents/supervisor/src/supervisor-resume-decide.ts:38`. The `-uuu` form was used because this is an absence claim about the rest of the tree.

The document was moved rather than deleted: it stands under quarantine in the instructions repo as `dirty/code/packages-agents-messages-docs-delivery-observation.md`, and is being emptied now, so the pointer resolves in neither repo.

What separates this from the two standing findings is scope. `agent-fleet/supervisor-docs-pointers-dangle.md` enumerates fifteen files and states its subject as `packages/agents/supervisor/docs/`; `agent-fleet/monitor-doc-pointers-dangle.md` is scoped to `docs/per-agent-monitors.md`. Neither names `messages/docs/`, and `supervisor-resume-decide.ts` is not among the fifteen. `rg -uuu -iln "delivery-observation"` over `~/memory` exits 1.

What makes it likely to survive a repair is that the pointer costs nothing to ignore. The docblock it closes already restates inline the measurement it cites — the 63% `source='system'` loss in `[-0.5s, 0)` and the backlog drain claiming at ~+1.2 s — so a reader who follows the pointer and finds nothing has lost no information, and a reader who does not follow it notices nothing. The citation reads as provenance for a figure the code is acting on, which is the shape a reader is least likely to test.
