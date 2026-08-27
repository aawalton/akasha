---
id: 99f92bf7-864e-5ad2-b825-b47f92234534
page-type-slug: finding
title: "Throwaway user holds live feed credential"
domain-slug: domain/global
---

# Claim

A live `device_secrets` row belongs to `browser-test@throwaway.alanwalton.com`, the isolated throwaway user `ops browser-test ensure-user` resolves-or-creates. `guardReadout` admits on whether a caller authenticated and never on which user, so that row's secret opens all seven gated readout feeds on `alanwalton.com` — the same shape as the `smilingjenny-ring-relay` row #18343 revoked, surviving it because the relay row was the one anybody was looking for.

# Evidence

Read 2026-08-10, against the live database and `~/code` at the deployed `136d90c0e04c8dd8df02c75d4fa77e79d554bd74`.

THE ROW. `select user_id, device_id, created_at, last_used_at, revoked_at from device_secrets` returns five rows, three live. One is `user_id 4ee54543-cb30-4f47-a8d0-9269b4b7df76`, `device_id 936C8368-FA93-462E-866B-2C3507949678`, created `2026-07-25 07:31:50+00`, `last_used_at` null, `revoked_at` null. `auth.users` gives that user as `browser-test@throwaway.alanwalton.com`.

THE GUARD. `packages/alanwalton/web/app/readout-credential/lib/readout-credential.server.ts:15-16` is the whole decision: resolve the credential, then `return credential.authenticated ? null : buildReadoutRefusal()`. `DeviceSecretContext` carries a `userId` on its authenticated arm and nothing reads it. `resolveDeviceSecretContext` (`device-secrets.server.ts:102-116`) selects on `secret_hash` alone, with no user predicate.

THE SEVEN. `api.claude-usage`, `api.pipeline-health`, `api.project-counts`, `api.habit-stoplights`, `api.inbox-stoplights` and `api.values-stoplights` call `guardReadout`; `api.categorization` calls `guardRingReadout`, which tries the relay arm and otherwise falls through to it.

A SECOND READING FROM THE SAME QUERY. That `device_id` appears on two live rows, under the throwaway user and under Alan, created four hours apart and neither ever used. The primary key is `(user_id, device_id)`, so one device holding two accounts' credentials conforms.

WHAT I DID NOT MEASURE. Only the digest is stored, so I could not present the secret and watch a feed admit it: this is the row and the code path read, not a demonstrated request. I did not establish whether anything still holds that plaintext, which is what decides whether this is reachable or merely unrevoked.
