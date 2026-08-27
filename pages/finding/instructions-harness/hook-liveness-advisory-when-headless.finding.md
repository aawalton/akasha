---
id: 202792f8-ef3e-5f51-99c6-d04ac7b9930d
slug: hook-liveness-advisory-when-headless
page-type-slug: finding
title: "Hook liveness advisory when headless"
domain-slug: domain/global
---

# Claim

`hook-liveness` returns advisory on every door call a spawned headless seat makes, and pass on the same call made from an interactive seat.

# Evidence

On 2026-08-04 a headless seat spawned through `ops seat start` ran five `ops instructions edit` calls, each invoked from Bash. All five returned `[hook-liveness] advisory` with identical text: `hold-identity.ts` last fired for `Bash`, not for this call, so this act cannot be shown to have passed through it.

The same door, invoked the same way from an interactive seat minutes later, returned `[hook-liveness] pass — tools/hooks/hold-identity.ts fired for this call 159ms ago`.

The hook is registered and running in both cases. `ops instructions run-checks` reports `hooks-fire` pass, 8 of 8 running as registered, and `hooks-delivered` pass, 25 registrations reaching 9 live seats across 2 payloads.

What differs between the two calls is not established here. The headless seat's own reading proposed a matcher on the wrong field in `tools/gates/hook-liveness.ts`; neither that seat nor this one read that file, so the proposal is inference and only the two readings above are measured. The advisory does not block: all five writes landed and all five commits pushed.
