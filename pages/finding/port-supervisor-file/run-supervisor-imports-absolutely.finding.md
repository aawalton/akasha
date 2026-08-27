---
id: d3dc94a7-3d0b-53d6-884f-c5db8d805896
slug: run-supervisor-imports-absolutely
page-type-slug: finding
title: "Run supervisor imports absolutely"
domain-slug: domain/global
---

# Claim

`tools/run-supervisor.ts` imports `setAgentName` and `watchSessionFile` by absolute path out of `~/code/packages/agents/shared`, the last non-relative import in the whole `tools/` tree.

# Evidence

Reported by the review of `domains/tasks/agent-harness/port-supervisor-file.md` on 2026-08-16, which states it does not falsify that task's line 21, the file being the harness runner rather than a ported one, and raises it because the porting lead should know it is there. Not re-checked here.
