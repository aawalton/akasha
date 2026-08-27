---
id: cd2e4c9b-c03e-572e-a89e-708ab65587e2
page-type-slug: finding
title: "Prose in akasha names ops commands that do not exist, and nothing checks a named command resolves"
domain-slug: repo/akasha-repo
---

# Claim

Prose in akasha names ops commands that do not exist, and nothing checks that a name in a message resolves. Verified missing against the live registry: `ops pipeline redeploy`, `ops pipeline reset`, `ops person-authority grant`, `ops browser-test ensure-user`. `person-access` and `person-authority` are page types, never commands. `tools/ops/dispatch.ts:92` ends at `"ops: unknown command"`, so following one met a second error atop the first.

# Evidence

The registry is what `declaredCommands()` at `tools/ops/declared.ts:38` and `forwarderCommands()` at `tools/ops/forwarders.ts:57` return, and each name was grepped against it. On disk the same answer stands: `tools/commands/pipeline/` holds no `redeploy` and no `reset`, there is no `tools/commands/person-authority/` at all, and `tools/commands/browser-test/` holds only `verify-render.ts`. Found by walking the repository for a different reason — clearing ops names — rather than by looking for dead names.

Not measured: how much of akasha's own prose, its alert attachments and its task documents name ops commands, and how many of those resolve. One counter-example is already known: alert attachments name `ops query-perf triage`, and there is no `query-perf` command.
