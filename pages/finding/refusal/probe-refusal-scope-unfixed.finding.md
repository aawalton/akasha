---
id: 1ff009fa-25dd-57ba-a12c-af363bad2cb6
page-type-slug: finding
title: "Probe refusal scope unfixed"
domain-slug: page-type/refusal
---

# Claim

`refusals/hook-probe-settings-absent.md` says the absent settings file leaves "no registered command to run any hook by". That is true of the probe, which reads `settings/agents.json` alone. Read as a claim about what runs on the workstation it is false, `~/.claude/settings.json` being a second registry whose registrations stay live — the correction its sibling `hook-settings-absent` took on 2026-08-12. Nothing on the document fixes which scope is meant.

# Evidence

Raised by the dispatched `review-instructions` seat reading `refusals/hook-settings-absent.md` on 2026-08-12, after repairing the same false consequence on its own subject and confirming from `hooks-agree.ts` that the user tier is a real second registry rather than a hypothetical one.

The seat that read `hook-probe-settings-absent.md` on 2026-08-11 kept the line, judging it a claim about the probe. Both readings agree it is true as written; neither settled which scope a blocked reader takes it in.

Not measured: whether any reader has acted on the wider scope, and whether the other refusals in this family carry the same open scope.
