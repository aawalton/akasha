---
id: 6b37b6b5-a224-56ce-8bfa-defd5c282fc3
slug: principal-follows-launch-path
page-type-slug: finding
title: "Principal follows launch path"
domain-slug: domain/seat-principal
---

# Claim

The headless launch core states `principal: agent` on every seat it starts, so a seat of Alan's moved from interactive to headless takes the agent name form and stops answering to the short address he resumes it by. `domains/seat-principal.md` says a principal does not change when the mode does; `LAUNCH_PRINCIPAL` in `packages/agents/cli/src/agent/state-identity.ts` says the opposite, on the ground that an agent asked for the seat — true of a spawn, false of Alan's own.

# Evidence

Three seats Alan moved headless on 2026-08-11 carry `mode: headless` and `principal: agent` written at the same millisecond, over an `availability` record from Alan written earlier: `dalla` renamed to `dalla-code-harness-definer-review-findings`, `amy` to `amy-alan-harness-definer`, `ryn` to `ryn-domain-system-lead`, read from `~/.instruction-seats/*.json`.

The interactive fronts state `principal: alan` (`tools/aw/init/state-seat-attributes.ts`) and the headless core states `principal: agent` (`packages/agents/cli/src/agent/state-identity.ts`), so the value tracks the launch path rather than who the output is for. `ops seat start` states the same pair and is right to: an agent did ask for that seat.

Not measured: whether `ar <name>` in fact fails to find a renamed seat — the resume front resolves a name through `ops seat takeover`, and I read that path rather than running it. Not measured either: what else reads a seat's principal besides the name composition, so the cost of the wrong value may be wider than the address.
