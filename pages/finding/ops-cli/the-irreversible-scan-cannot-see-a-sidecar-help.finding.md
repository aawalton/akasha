---
id: 69de233d-d5f7-556b-af46-1ad74817eb2e
slug: the-irreversible-scan-cannot-see-a-sidecar-help
page-type-slug: finding
title: "The irreversible scan cannot see a sidecar help"
domain-slug: domain/ops-cli
---

# Claim

The code repository's `packages/infra/checks/src/checks/irreversible-list.ts` under-reads its own subject, and as of instructions commit `897dbaa52` nothing in the instructions repository consumes it or the map it drives. `ops seat send` declares itself irreversible in both repositories and was gated in neither.

# Evidence

The check derives the set by matching the declaration marker in each handler file's TEXT, reached through `handlersByVerb` in `packages/infra/checks/src/lib/ops-handler-map.ts`. `handlersByVerb` maps `agent send` to `packages/agents/cli/src/agent/send.ts`, whose whole content on this point is `export { help } from "./send.help"`. The marker stands in `send.help.ts`, which the scan never opens. The file's own header names this error mode and accepts it; `agent send` is the concrete instance, and it is the verb that delivers a message to another seat.

Measured: `ops irreversible list --json` returned three verbs — `agent reap`, `launcher realign`, `ask-alan` — against the four that declare it. A structured reading of the help objects returns four. Ten of the 720 surfaces under `tools/commands/` take their help from a `tools/lib/*-help.ts` sidecar, so the same blindness was available to nine more verbs.

The second half is the reach. `tools/commands/irreversible/list.ts` used to import `handlersByVerb` through `codeModule` and was the instructions repository's only consumer of it. That verb now reads the help object each command under `tools/commands/` exports, so the reach is gone. `handlersByVerb`'s remaining consumers are both in the code repository — `checks/irreversible-list.ts:34,66` and `audits/ops-subject-census.ts:57,219` — and `workspacePackages` in the same module is a separate half with a live non-verb consumer at `lib/guard-reach-resolve.ts:24`, feeding `check-guard-reach`.

So `checks/irreversible-list.ts` is now dead weight from this side and still stands in the code repository, where it goes on producing an inventory that is short by one verb.
