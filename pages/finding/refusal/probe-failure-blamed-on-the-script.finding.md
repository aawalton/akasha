---
id: c2509fd8-69c8-5712-810b-51d04a9a18fe
page-type-slug: finding
title: "Probe failure blamed on the script"
domain-slug: page-type/refusal
---

# Claim

`refusals/hook-probe-failed.md` reads as an accusation against the script, where a probe failure can equally be the runner's fault — `hook-probe.ts` documents the environment leak and sandbox `$HOME` that cause exactly that, and warns of "a reason that is this file's fault".

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-probe-failed.md` dispatched from `review-documents`. The reading narrowed the body twice and left this fork.

`tools/lib/hook-probe.ts` gives each probe child a sandbox `HOME` and `INSTRUCTIONS_ROOT`, its own `CODE_ROOT`, deletes `AGENT_ID` and `CLAUDE_CODE_SESSION_ID`, then lays `probe.env` over the top — and its own prose warns of a failure "that is this file's fault".

So the body's reader is being told a hook failed its probe, in words that place the fault on the hook, when the runner is a live candidate.

The reading's two landings narrowed the overclaim without reaching this. It cut "this hook is refusing nothing", which is general over all 27 probes and false for 12 of them — six artifact probes and six TypeScript ones that refuse nothing ever, the wording having been taken from two bodies that name `hold-seat.ts`, which does refuse. And it trimmed "exactly" from "run exactly as `settings/agents.json` registers it", since `expandCommand` rewrites every `$HOME` token before the child sees it.

Naming the fork outright rests on judgment rather than on anything an instrument settles, which is why it came back.

Not measured: how often a probe failure has turned out to be the runner's, or whether the sibling bodies this check prints carry the same slant.
