---
id: 5006e4f5-ca17-5676-9d97-16f4af8b71ca
page-type-slug: finding
title: "Persona enumeration unscoped by owner"
domain-slug: domain/pages-system
---

# Claim

`listPersonaTargets` reads `public.pages` unscoped by owner while an owner-scoped reader exists in the same tree, so the wake-arming and chat-mirror gate enumerate 42 rows for 41 distinct slugs and a foreign tenant's row can arm a wake or match a gate under one of Alan's slugs.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f` and the live database. A quarantined document reported the same numbers on 2026-07-29; they reproduce exactly, so this is a standing state.

    select count(*), count(distinct slug), count(distinct user_id)
      from public.pages where page_type_slug='persona' and deleted_at is null
    → 42 rows, 41 slugs, 2 owners

The extra row is `selah`: two live rows under two different `user_id`s. The second owner, `4ee54543-…`, is the test user, whose rows are minted by the suite.

`listPersonaTargets` at `packages/agents/shared/persona-wake-slugs.ts:92` is three lines: `createServiceRoleClient()`, then `getPages(sb, { pageTypeSlug: PERSONA_PAGE_TYPE_SLUG })`, then a pure projection. There is no owner predicate. Its own docblock names the reach: *"the single persona-enumeration source for the persona-gated agent behaviors. Both `listPersonaSlugs` (wake-arming) and the chat mirror's `matchPersonaForAgent` gate derive from this one read."*

Callers, excluding tests: `recipient-derivation.ts:144`, `attention-question.ts:191`, `ask-alan.ts:167`, `persona-chat-mirror.ts:57`, `persona-wake-slugs.ts:132` and `:145`, and three daily-tracking CLIs (`hourly-confirm.ts:120`, `hourly-confirm-stall.ts:100`, `hourly-confirm-pending.ts`).

The remedy exists in the tree and is not applied here. `getOwnerScopedPages` is exported from `@agents/shared/owner-scoped-read` and is used by the persona CLI at `roster.ts:97`, `resolve.ts:146` and `resolve.ts:165`. So one persona enumeration is owner-scoped and the one feeding wakes and gates is not.

Deleting the duplicate row is the wrong remedy: the shells are recreated by a suite doing its job, and the next collision is with whatever fixture a future test names.

Not established: whether a foreign row has ever armed a wake. I read the query and the callers, not the wake log.
