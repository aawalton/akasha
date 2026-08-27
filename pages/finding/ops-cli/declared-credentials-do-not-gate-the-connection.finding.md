---
id: a1ef7001-3dac-5208-a9fd-91fc00cfef4b
slug: declared-credentials-do-not-gate-the-connection
page-type-slug: finding
title: "Declared credentials do not gate the connection"
domain-slug: domain/ops-cli
---

# Claim

`ops inbox-tracking poll-once` and `run` declare `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `USER_ID` in their help, and unsetting all three does not stop either verb reaching the live database. A reader who scrubs them to make a run safe gets a successful live write instead.

# Evidence

Found 2026-08-13 by the seat moving the `inbox-tracking` bodies, and disclosed by it rather than discovered afterwards.

It scrubbed the three variables before driving `poll-once` and `run`, expecting the tick to fail harmlessly. Both succeeded: the credentials reach the client through a loaded dotenv rather than through those variables. The proof patched today's live `daily-tracking` row several times across two capture passes.

The writes themselves were benign and nothing is falsified — each recorded true present inbox counts, which is exactly what the poller writes on its own schedule. That is why this is filed as a fault in the declaration rather than as damage.

What makes it worth writing down is the shape of the error. The seat held a belief about safety BEFORE acting, the belief was false, and nothing between the belief and the act would have corrected it. A declared environment variable reads as the thing that supplies a value, so removing it reads as removing the value. Here it is neither.

The reach is wider than these two verbs. Any verb declaring credentials it does not in fact read from the environment carries the same trap, and a seat sandboxing a proof by scrubbing them will believe it has prevented a write it has not. `domains/role.md` Verification applies to a negative claim exactly as it does to a positive one: a check never run and a sandbox never confirmed both read as a pass.
