---
id: 8dd406e2-5f39-550c-9cec-fef12323789e
page-type-slug: finding
title: "The interactive-boot module stub still declares an export name the real module renamed"
domain-slug: domain/agent-harness
---

# Claim

The interactive-boot arm cannot load its subject, because the module stub it installs for `supervisor-adopt.ts` still declares `writeAgentBootFilesIfFresh` while `supervisor-interactive-boot.ts` now imports `reconcileAgentBootFiles`.

A stub replaces the whole module, so a name the stub omits is missing however plainly the real file exports it. The real `tools/lib/supervisor-adopt.ts` does export `reconcileAgentBootFiles`, and importing it outside the stub succeeds; only the stubbed load fails.

# Evidence

`bun test tools/tests/interactive-boot-recording.on-demand.test.ts` gives 0 pass, 1 fail:

`arm exited 1 under TZ=UTC: SyntaxError: Export named 'reconcileAgentBootFiles' not found in module '/var/home/walton/instructions/tools/lib/supervisor-adopt.ts'.`

`tools/lib/supervisor-adopt.ts:138` reads `export function reconcileAgentBootFiles(`, and `bun -e` importing that module directly reports the export as a `function`. `tools/lib/supervisor-interactive-boot.ts:4` imports it and calls it at line 70.

`tools/tests/interactive-boot-stubs.ts:17` calls `mock.module` on `supervisor-adopt`, and the object it returns names `resolveClaudeHandoff` and `writeAgentBootFilesIfFresh` only.

Commit `899439cb7` is where the boot path moved to reconciling the declared Claude config; `writeAgentBootFilesIfFresh` survives nowhere in `tools/`.

Renaming the stub's key alone will move the recording digest, because the stub records the call under its own label and that label is digested.
