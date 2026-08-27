---
id: 4779acfc-f84f-51b6-8eae-060dbda2882b
page-type-slug: finding
title: "Sms hub fallback refused"
domain-slug: domain/agent-harness
---

# Claim

The SMS unclear-case fallback cannot write its message: `api.sms.webhook.ts` composes `warrant: { kind: "human-awaiting" }` over `source: "system"`, and `decideEmission` refuses that pair, so every SMS routed to the `amy` hub throws inside the webhook handler rather than reaching a mailbox.

# Evidence

`packages/alanwalton/web/app/routes/api.sms.webhook.ts:67` stamps `const source = target !== "amy" ? \`sms:${target}\` : "system"` and then calls `wakeAgent` with `warrant: { kind: "human-awaiting" }`. The comment beside it — "Amy's fallback deliveries (target `"amy"`) stay `"system"` (zero amy regression)" — predates the wake-warrant module.

`decideEmission` (`packages/agents/shared/wake-warrant.ts`) reaches the `!wakes` branch first: `emissionWakes` tests the envelope against `DECLARED_WAKE_SENDER_MATCHES`, and bare `system` contains none of them (`ruleMatches` requires the STAMPED source to contain the DECLARED rule, and every declared entry is longer). Run directly on 2026-08-03:

    decideEmission({ senderAgentId: null, source: "system", warrant: { kind: "human-awaiting" } })
    → { allow: false, reason: "a wake was warranted for the ratified class, but this envelope
        (sender=none, source='system') matches no declared wake source and revives nobody …" }

Had it passed that branch it would have failed the next one too: `isHumanChannelSource("system")` is false, since that predicate admits only `sms:`-prefixed sources, `page-chat`, `question-answer` and `question-dismiss`.

`handle-inbound.ts:94` sends every non-helper route to that target (`decision.kind === "helper" ? decision.target : "amy"`), so the affected population is every inbound SMS from a number matching no enrolled identity — the escalate-by-default path. `wakeAgent` throwing propagates out of the `deliver` callback and out of `handleInboundSms`, so the route returns a 500 to Telnyx rather than the 200 the success path returns.

Observed while settling the scope boundary of project #17617, which considered and declined to re-point this target at `amy-handler`; the row did not change this file.
