---
id: 23648e4b-85d1-5328-82fa-b656c926f54f
page-type-slug: finding
title: "Alan push chokepoint ungated"
domain-slug: page-type/alert
---

# Claim

`notify(USER_ID, …)` is a plain exported function, not a gate: nothing in it
refuses a new direct-to-Alan push. Two unattended alert tiers call it today, not
one, and the ruling that is supposed to limit them — Alan's #15210 "no
direct-to-Alan push", narrowed once on 2026-07-15 — stands in no live document.

# Evidence

Read 2026-08-07 while ingesting `dirty/code/packages-agents-infra-alert-bridge-claude.md`, deleted
2026-08-09. It carried the ruling's own test for the one narrowing: no headless lever exists,
recovery is Alan-only interactive, and the seats that would normally escalate are themselves
downstream of the failure.

THE CHOKEPOINT IS NOT A GATE. `packages/shared/notifications/src/notify.ts:91` is
`export async function notify(` with no allowlist, no caller check and no severity floor. "Paved
chokepoint" describes where the pushes converge, not anything that turns one away. What refuses a
push is each caller's own predicate.

THREE CALLERS, TWO OF THEM UNATTENDED ALERT TIERS.

    packages/agents/infra-alert-bridge/src/alan-push.ts:53      auth-death critical (#15465)
    packages/agents/supervisor/src/keeper-unrevivable-push.ts:56  keeper cannot be woken
    packages/agents/shared/ask-alan.ts:145                       an agent asking a question

The first is gated by the pure `isDirectAlanPushAlert` (`decide.ts:331-339`): firing edge, the
auth-death alertname, severity `critical`, `account` = the registration account. The second has no
such gate outside its own call site. Its header states the same test the ruling turns on — "the one
failure nobody downstream can report, because everyone who would report it is downstream of her" —
so it looks like a correct second exception, but it was never weighed against the ruling anywhere a
reader can find.

WHERE THE RULING ACTUALLY LIVES. One code comment, `decide.ts:312`, and the quarantined document
above. `rg -uuu` over `domains/`, `tools/` and `settings/` for "direct-to-Alan", "iphone", "apns"
and "notify(" returns nothing, so no live instruction constrains a fourth caller.

WHAT THIS ADDS TO THE STANDING FINDING. `pages/finding/alert/recipient-is-a-seat-not-a-person.finding.md` says
reaching Alan is "one gated tier" and cites this same ruling. It is two tiers, and the convergence
point gates neither.
