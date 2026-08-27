---
id: 69474840-9f03-5d99-b6f5-6de38bed1e47
page-type-slug: finding
title: "Spawn success over dead boot"
domain-slug: domain/agent-harness
---

# Claim

`ops seat start` reports a seat spawned, and exits zero, for a seat that dies at boot because its registration account cannot authenticate.

The row is minted and the name bound before launch, so both the TSV line and the `--json` record are written from state that exists whether or not the supervisor survives its first second. Nothing between that success and a deliberate liveness probe says otherwise, and a dispatcher spawning several in one run is told the same thing several times.

# Evidence

On 2026-08-10 five seats were spawned onto projects #18375, #18382, #18407, #18437 and #18438. All five returned `<agent_id>\t<name>\tspawned` and exited zero. All five were dead. Each `~/agents/<name>/spawn.log` ends in the same fatal: `Registration account "aawalton" cannot be loaded (invalid_grant: Refresh token expired). A headless session cannot re-authenticate`, thrown from `selectAccountAndWriteCredential` at `packages/agents/supervisor/src/supervisor-agent.ts:159` in the `code` repository.

Nothing surfaced it. `ops seat list` simply stopped returning the five rows, which is indistinguishable from a fleet that never had them, and the discovery came from Alan asking whether the dispatches had errored — roughly eight minutes after the last spawn returned success.

A message sent to one of the dead seats was accepted and queued: `ops seat send` returned a message id and `pending`, and `ops seat delivery` read it as `not-yet/unclaimed — offered and not taken, and nothing yet proves the seat had its chance`. That verdict is correct and is also what a live seat mid-turn produces, so the send path did not distinguish the two either.

`ops seat alive '#<seq>'` DID answer correctly, reporting `Project #<seq> has no live seat (1 not in their chairs)` for each. So the probe exists; nothing calls it on the dispatcher's behalf.

NOT MEASURED: whether the same silence follows a boot failure from any other cause, since only this one was observed. Whether `ops seat start` has a mode that waits for the supervisor to come up. Whether the halt or reaper machinery files a record for a seat that dies this early — no `agent.exit` read was taken. Why the account's refresh token had expired, or what re-authenticated it: `~/.claude/accounts/aawalton/.credentials.json` was rewritten about twelve minutes after the failures, and the re-spawned seats all came up live, but nothing was read to establish who wrote it.
