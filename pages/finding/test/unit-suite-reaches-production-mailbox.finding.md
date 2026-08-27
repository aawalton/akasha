---
id: bb391e40-752b-5b78-85e7-843d18bda751
page-type-slug: finding
title: "Unit suite reaches production mailbox"
domain-slug: domain/test
---

# Claim

`packages/agents/shared/db-messages.unit.test.ts` says in its own header that its cases run with no database reachable at all. On the workstation that is false: the suite reaches production `public.messages`, and the only thing keeping it from writing there is the refusal the cases are testing. So the file's negative control is destructive — the run that shows the guard is load-bearing is the run that lands a row in the live mailbox.

# Evidence

The header reads: "These tests run with no database reachable at all — if they pass, the refusal is genuinely pure and genuinely first."

Measured on 2026-08-15 while building #19231. The guard in `sendMessage` was replaced with a no-op and the file run through `ops tests run packages/agents/shared/db-messages.unit.test.ts`. The case did not merely fail — bun reported "Received promise that resolved", meaning the write succeeded. Row `01a00763-c0ec-74d5-a47d-50f2dfa5aeef` landed in `public.messages`, `status pending`, `source system`, `warrant {"kind": "blocked", "blockedAgentId": "   "}`, addressed to `019fa041-bcdb-70f8-ba94-ff353f5f319d`, which is the fixture UUID and is a real agent row at status `done`. It was soft-deleted in the same session.

`createServiceRoleClient()` resolves its credentials from the environment the suite inherits, and the workstation's shell carries them. Nothing in the file or the runner isolates it.

Two readings, and the evidence does not part them:

- The claim is stale and the suite was hermetic when it was written, in which case the header is the thing to correct.
- The claim was never true, in which case every case in this file that reaches `sendMessage` has always been one guard away from writing to production, and the same holds for any unit suite calling a live client.

What makes it worth filing rather than repairing in place is that the fix is not local: refusing before a client is built is exactly what the file is asserting, so the assertion cannot be made safe by the thing it asserts. Something outside the file has to deny it credentials.
