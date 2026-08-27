---
id: 43f574c4-d7c6-53dc-8174-833efb2560c8
slug: credential-pick-reports-empty-pool-for-every-failure
page-type-slug: finding
title: "Credential pick reports empty pool for every failure"
domain-slug: domain/agent-harness
---

# Claim

A spawn refused with `No managed credential available` while the credential pool held ample headroom, because `getBestCredential` returns `null` for every failure it can have — an empty pool and a database it could not reach are the same answer.

# Evidence

Spawning a developer seat onto #18900 on 2026-08-15 exited at boot with `No managed credential available`, thrown at `tools/lib/supervisor-agent.ts:104` where `getBestCredential` returned nothing.

The pool was not empty. `ops claude-account census` read every account as holding a renewable credential, and `ops claude-account status --json` read several sitting near-idle on both windows. Both of those reads reach the database over its REST path.

Direct psql was refusing new connections throughout, before the spawn and after it: `remaining connection slots are reserved for roles with the SUPERUSER attribute`. `getBestCredential` in `packages/agents/oauth/src/oauth-credentials.ts` wraps its whole body in a `try` whose `catch` logs and returns `null`, so a connection failure inside `getAllCredentials` or `getClaudeAccountPacing` arrives at the caller as no eligible account.

That the connection exhaustion is what this spawn hit was not established — the two were observed together and the swallow is what makes them indistinguishable. That is the finding: the caller cannot tell which it met, and the message it prints names only one of them.
