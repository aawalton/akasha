---
id: f43f04a7-2bb4-5bfc-bb8f-fdf64905d9f2
slug: revoke-reports-success-blind
page-type-slug: finding
title: "Revoke reports success blind"
domain-slug: web-app/alanwalton-web
---

# Claim

`revokeDeviceSecret` in `packages/alanwalton/web/app/device-secret/lib/device-secrets.server.ts` returns `200 {ok:true}` whether it revoked a live secret, revoked nothing because the row was already revoked, or matched zero rows entirely, because it never inspects the affected-row count on a credential boundary.

# Evidence

From project #16012 (domain `alanwalton-web`, status `someday_maybe`, captured 2026-07-25T09:31:03.194Z, never given an objective).

Code, `packages/alanwalton/web/app/device-secret/lib/device-secrets.server.ts:65`:

    const { error } = await supabase
      .from("device_secrets")
      .update({ revoked_at: new Date().toISOString() })
      .eq("user_id", args.userId)
      .eq("device_id", args.deviceId)
      .is("revoked_at", null)
    if (error != null) throw new Error(…)

No affected-row-count check, so `200 {ok:true}` is identical whether the call revoked a live secret, revoked nothing because already revoked, or matched zero rows: wrong `device_id`, wrong `user_id`, or no row at all. The zero-row case is dangerous: a caller revoking the wrong device, or under the wrong identity, is told it succeeded. The docstring defends the no-op as deliberate idempotency for the sign-out caller, which does not require hiding the distinction from a caller that wants it; Postgres already returns the affected row count.

Observed harm, same night: project #15933's verification notes claimed the one real secret minted for device 936C8368 was revoked. Read at 09:29Z, `revoked_at` was actually NULL — live, for Alan's physical iPhone UDID under a throwaway identity, for roughly 2 hours inside a `verification_automated` park. Harm was limited only because a separate guard held (`active-energy-write.ts:40` refuses when `resolvedUserId !== ownerUserId`). Revoked manually afterward (`UPDATE 1`, verified by read-back).

Fix direction recorded, not built: report which case occurred using Postgres's row count; keep sign-out non-failing; make a no-match result loud somewhere.

Adjacent, flagged but unverified: `mintDeviceSecret` upserts with `revoked_at: null` on conflict `(user_id, device_id)`, so a mint un-revokes a previously revoked device — likely intended, but combined with the above, a device's credential history cannot be reconstructed from either function's return value.
