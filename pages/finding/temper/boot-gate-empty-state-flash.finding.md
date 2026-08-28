---
id: 0c7c0be1-4046-5f3a-8111-16387b015c31
slug: boot-gate-empty-state-flash
page-type-slug: finding
title: "Boot gate empty state flash"
domain-slug: domain/temper
---

# Claim

On tempereso.com's `/character-builds?tab=plan` route, an account with successfully-synced characters can be shown, for a brief flash, the zero-branch empty-state copy that tells the user their characters never reached Temper — a false-negative render caused by the 4-second boot-gate degrade timer forcing `isLoading` to `false` before the Electric data fold has delivered any rows.

# Evidence

Project #16113, domain `temper`, no objective ever written; text below is its capture, moved off its retired `notes` attribute 2026-08-15.

Observed deployed, as Alan's real read-only identity, on `https://tempereso.com/character-builds?tab=plan` (`ops browser-test verify-render`). Two mutually exclusive branches of one ternary (`characters-plan-empty.tsx:48-54`) both PASS on the same route/account: the correct ">0" copy (4/4 probes) and the wrong zero-branch copy ("...before any characters reach Temper", 2/5 PASS, 1 hard FAIL). The probe passes on first appearance, so a PASS may be only a transient — sync succeeded but the user is sometimes shown copy blaming an empty list on the add-ons/Watcher (#15932/F14 class, via a render-state race rather than copy).

Mechanism established by observation: Node-side polling and `verify-render` both MISS this most of the time (0/8 vs a 3/3 positive control) since the false-empty is a ~165-260ms flash, visible only to an in-page recorder. The actor is the 4s boot-gate degrade, not auth lag (a pre-registered auth-lag prediction was tested and refuted).

`packages/shared/pages/ui/src/cache/tanstack-live.ts:54` `BOOT_GATE_TIMEOUT_MS = 4_000`; `:99-106` degrade timer sets ready=true on overrun without aborting the await. `use-query.ts:72` `isLoading = result === null || (!acquire.ready && result.rows.length === 0)`. Once the degrade fires, ready is forced true with zero rows, so isLoading goes false with `rows === []`; `characters-data-content.tsx:348` opens; `importedCharacterCount === 0`; `CharactersPlanEmpty` renders the zero branch at a 20-character account.

Found while verifying an unrelated copy fix under #15938; not #15907. Filed, not fixed: shared data-loading gates every tab here and the mechanism was unconfirmed at filing time; M1-class, a new user hits this surface day one. Repro is `verify-render` against the route above with `--expect-text 'before any characters reach Temper'`, read-only, intermittent, ~5 runs.
