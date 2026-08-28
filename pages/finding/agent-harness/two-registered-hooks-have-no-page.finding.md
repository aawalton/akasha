---
page-type-slug: finding
title: "Two registered hooks have no page"
domain-slug: domain/agent-harness
---

# Claim

Two hooks run on every session with no `agent-hook` page describing them.

`settings/agents.json` registers 26 hook scripts. Twenty-four are named for their page and sit beside it as `{slug}.agent-hook.code.attachment.ts`, which is what makes the page the place a reader finds out what the hook does. Two are bare `.ts` files under `tools/hooks/` with no page of that type: `block-whole-suite-run.ts` and `state-errand.ts`.

One of them has a `refusal` page, which records what it says when it refuses but not that it exists or when it fires. The other has nothing at all, so what it does is only in its own source.

# Evidence

Measured 2026-08-27 in akasha at `fb243e45c`. Every `tools/hooks/*.ts` path in `settings/agents.json` was extracted and checked for a page beside it: 26 registered, 24 with one, 2 without.

The two are `tools/hooks/block-whole-suite-run.ts` and `tools/hooks/state-errand.ts`. A search of every tracked file for either name returns only the scripts themselves and `pages/refusal/block-whole-suite-run.refusal.md`.

Not measured: whether either hook is still wanted, or whether the missing page is the reason rather than the symptom. Only `settings/agents.json` was read; a hook registered somewhere else would not have been seen.
