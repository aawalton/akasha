---
id: 409ffc2b-b7c2-535f-8602-fa099576997a
page-type-slug: finding
title: "Mode never written by any launch"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17400 (domain `seat-mode`) found that the pin store's `mode` field (interactive/headless, who can hear a seat) that `domains/role.md` and the review tasks fork on is never set by any launch path — `bun tools/pin.ts --mode <mode>` is the only writer in either tree, and of 26 pin files on disk only 2 carry a `mode` key, both written by a manual follow-up minutes after the identity pins — so the unset third state is universal and both live branches of every fork are dead.

# Evidence

Project #17400, domain `seat-mode`. The instructions pin store records a `mode` beside the four identity axes — `interactive` or `headless`, who can hear a seat. `domains/role.md` and the review tasks fork on it: a seat decides for itself where its pin records headless, puts the decision to Alan where it records interactive, and returns it to its principal where the pin records neither.

Nothing sets it. `bun tools/pin.ts --mode <mode>` is the only writer in either tree, and no launch path calls it. Measured: 26 pin files on disk, 2 carry a `mode` key, both written by a manual follow-up command minutes after the identity pins. The third (unset) state is universal; both live branches of every fork are dead.

Both launch paths already know the answer as a fact: Headless — `packages/agents/cli/src/agent/pin-identity.ts` `pinSeatIdentity`, called from `launch-supervisor.ts:214`, passes `--headless` at `:137`. Interactive — `packages/shared/cli/src/aw/init/pin-identity.ts` `pinIdentityLines`, emitted into the `an`/`ar` bash fronts at `init/bash.ts:245` and `:320`.

What the fix must not get wrong: `PINNED_AXES` is the wrong home — `tools/lib/pins.ts:58` states the mode sits beside the axes, not as one: no slug, resolves to no document, not filtered by `pinnableAxes`. The mode call is not conditional on any axis taking — `pinSeatIdentity` returns early at `:165` when no axis resolved, and `pinIdentityLines` skips each `unknown`/`none`/`null` slug; a seat whose persona resolves to nothing is still headless, so the mode records outside both, else the least-identity seats get least protection. It stays a rider on the launch, never a condition of it — a failure to record the mode costs the pin, never the boot.

Verify: a spawned headless seat's pin file carries `"mode":{"value":"headless"}` and an `an` front's carries `interactive`, each without a manual follow-up. Existing seats heal on next relaunch (headless side) and on resume via `pinResumedIdentityLines` (interactive side).
