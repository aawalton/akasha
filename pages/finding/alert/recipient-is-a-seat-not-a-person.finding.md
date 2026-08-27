---
id: 4f078ca8-8940-54e9-b8e5-ee81800c600b
page-type-slug: finding
title: "Recipient is a seat not a person"
domain-slug: page-type/alert
---

# Claim

`alert` is defined as a message to a person, but a person is the rare and explicitly gated recipient while an agent seat is the ordinary one. The definition is closer to inverted than to narrow.

# Evidence

`domains/alert.md`: "**Alert** — a message to a person, sent by code that spotted a condition it watches for."

Against the machinery, verified in the code repository:

- `packages/agents/infra-alert-bridge/src/messenger.ts:4` — "The worker addresses the `aranya` persona — the ground-layer seat", resolved through `resolveAgentTarget("aranya")`. A seat, on the ordinary path.
- `packages/agents/shared/agent-kill-alert.ts:7` — a host-survival kill "MUST alert the harness lead (athena)". Also a seat.
- Reaching Alan is one gated tier: `isDirectAlanPushAlert` in `packages/agents/infra-alert-bridge/src/alan-push.ts`, and `decide.ts:312` records why — "for which Alan narrowed his #15210 'no direct-to-Alan push' ruling (2026-07-15)."

The second clause fails separately. `packages/agents/shared/terminal-alert.ts` documents `bun ops seat alert` as "an explicit act by the agent that needs his eyes" — a message to a person that no code spotted a condition to send.

Three candidate repairs, each deciding what the domain covers rather than correcting a fact: widen the recipient to a person or a seat; hold the line and treat seat traffic as agent-to-agent messaging outside this domain, leaving `ops seat alert` as a name collision; or narrow it deliberately to the person-facing tier and say so. Nothing on the perimeter picks among them.

The absent `code-path:` rides on the same answer rather than standing as a second question. Its consequence: because this domain claims no code files, nobody writing alert code is bound to read it, so `domains/instrument.md`'s Negative Control, Population and Horizon do not reach the alert paths at all.

Raised by the `review-instructions` reading of `domains/alert.md` on 2026-08-06. `athena` owns `alert`.
