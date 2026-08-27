---
id: c34dc202-7e43-5b8d-9760-17c5a7f2bd6e
slug: dev-server-state-split-unconsumed
page-type-slug: finding
title: "Dev server state split unconsumed"
domain-slug: domain/agent-fleet
---

# Claim

The read-side dev-server state helpers were split into `@shared/utils-system` to serve a supervisor consumer that does not exist, and `@agents/dev-server-cli` re-exports them straight back.

# Evidence

`packages/shared/utils/system/src/dev-server-state.ts` exports `devServerDir`, `parseDevServerState` and `listDevServerStates`. Searching `packages/` for `listDevServerStates|parseDevServerState|devServerDir|dev-server-state` across `**/*.ts`, unpiped, returns four kinds of site and no fifth: the defining module itself; `shared/utils/system/src/cli.ts`, which prints the export names in a help listing; `agents/dev-server/cli/src/lib/dev-server-ops.ts:19-32`, which imports all three and re-exports them as `devServerDir`, `listStateFiles` and `parseState`; and that file's unit test.

The supervisor never reads dev-server state. Five files under `packages/agents/supervisor/src/` import `@shared/utils-system/memory-monitor`, among them `memory-reaper-tick.ts`, `memory-reaper-proc-scan.ts` and `memory-reaper-kill.ts`, and nothing in that package imports `dev-server-state`.

Both statements of the rationale assert the consumer. `dev-server-ops.ts:24-28` reads "Re-export the read-side helpers that now live in `@shared/utils-system` so supervisor-side consumers can read dev-server state without importing from `@shared/cli` (which would create a package cycle — `@shared/cli` depends on `@agents/shared`)." The package's head document, now quarantined at `dirty/code/packages-agents-dev-server-cli-claude.md`, said the helpers live there "so the supervisor memory monitor can read state without depending on this package."

The named cycle is real for `@shared/cli`, which holds the `ops` dispatcher and does depend on `@agents/shared`. It is not the package the helpers were taken out of.

`check-acyclic-packages.ts` would be the instrument here, and its header says "Not registered in `checks.workflow.ts` yet".
