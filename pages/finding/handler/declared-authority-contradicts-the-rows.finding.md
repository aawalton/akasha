---
id: dff7d3ae-f7d8-52ae-a4b5-be3805df7b03
page-type-slug: finding
title: "Declared authority contradicts the rows"
domain-slug: role/handler
---

# Claim

`JENNY_HANDLER_SPEC.stateAuthority` declares the surface a handler seat may write as "location/location-collection/collection", and the account's rows disagree in both directions: she owns 417 `location-deal` rows the declaration omits and no `collection` row at all. Nothing compares the declaration to the data, so a seat reading it would decline her largest wholly-owned type as outside its boundary while believing it may write an estate-wide type she has no rows in.

# Evidence

Measured 2026-08-07 against the live database and the live code.

`packages/agents/routing-core/src/sms-entry-points.ts:57-62` carries the declaration: `stateAuthority: [{ kind: "pages-rows", detail: "Jenny's owned Atlas content pages (location/location-collection/collection), RLS-owned by her accountUserId" }]`. The spec's header calls itself the ONE CARRIER — "A statement about who can reach a seat belongs where it is reviewed, typed, diffed and deployed" — and line 52 carries her wake source at `status: "LIVE"`.

`select page_type_slug, count(*) from public.pages where user_id = '9bc63b11-d301-4a51-8839-7371336262c7' group by 1` through `ops db psql` returns exactly three rows: `location` 1203, `location-deal` 417, `location-collection` 1. There is no fourth. She owns no `collection` row, though that type holds 6,105 rows across the estate under other owners.

The declaration is wrong twice. It omits `location-deal`, her second-largest holding and the type every one of whose 417 rows is hers — a `group by` over it returns her account alone. And it names `collection`, a shared type spanning every domain, of which she owns none; a seat trusting that clause would take an estate-wide type as inside one external human's boundary.

Nothing reconciles the two. `stateAuthority` is prose on a typed literal: no check reads it, and the three consumers the header names — the wake-watcher's arming, `agent send`'s deliverability guard, the admin router's fabric — consume `wakeSources`, `bootPrompt` and `dormancyPolicy` rather than this field. `domains/lists/unresolved-checks.md` names no check over declared authority.

Found while ingesting `dirty/skills/jenny/SKILL.md`, whose sibling `findings.md` records the omission half. Both are queued for removal. The second half, that the declaration names a type she has no rows in, is recorded nowhere and was measured here.
