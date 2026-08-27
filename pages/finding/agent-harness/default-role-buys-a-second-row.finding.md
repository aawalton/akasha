---
id: a86df5a0-39d4-5d8c-8298-1f913706d1e0
page-type-slug: finding
title: "Default role buys a second row"
domain-slug: domain/agent-harness
---

# Claim

Two spellings of one seat mint two rows. `an athena` composes `athena`; `an athena lead` composes
`athena-lead` even though `lead` IS her default role, so a departure that departs from nothing
still buys a second, separately-addressable row.

# Evidence

Observed 2026-08-03 during `#17561`'s definition pass.

`an` composes the seat name at `packages/shared/cli/src/aw/init/bash.ts:297-298`:

    local _an_seat="$name"
    [ -n "$_an_typed_role" ] && _an_seat="$name-$_an_typed_role"

The test is whether a role token was TYPED, never whether the typed role differs from the
persona's default. So `an athena` and `an athena lead` name two different seats, and each binds its
own agent row, though both describe athena in her default role.

Both rows exist in the estate today. `athena` and `athena-lead` are separate rows, both
describing athena in her default role — which is the point: two names, one identity, two
mailboxes.

`initiatives/seat-identity.md`'s third objective states that a departure costs a compound naming
only the axis that MOVED. A default role is not a moved axis, so the compound spelling is not
earned in this case and the objective does not sanction it.

This has already cost a real misroute. `pages/finding/agent-harness/send-resolves-a-name-to-a-dead-row.finding.md`
records `ops seat send athena` enqueueing to a dead `athena` row while `athena-lead` was live and
already in the conversation, exit 0, with the dead-inbox refusal not firing. The two rows in that
finding are exactly the two spellings this one describes.

The domain axis compounds the shape rather than sharing it: no name spells a domain
(`packages/agents/cli/src/agent/classify.ts:44`), so `an ryn code-quality` composes the bare `ryn`
and reattaches her default row while pinning a different domain — a departure that gets no name at
all, where a non-departure gets a second one.
