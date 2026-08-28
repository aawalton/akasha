---
id: 451a2806-7a4f-4e9c-a1f2-b4deb5794d07
page-type-slug: finding
title: "resolveSlot answers an ambiguous bare slug with the first page a walk reached"
slug: resolveslot-answers-an-ambiguous-bare-slug-with-the-first-page-a-walk-reached
domain-slug: domain/pages-system
---

# Claim

A slug is unique within a page type and not across the corpus, so a bare slug names several pages. `resolveSlot` at `tools/lib/seat-resolve.ts:130-139` answers one of them rather than refusing, which `pages/domain/pages-system.domain.md:38` calls answering as though there were nothing. 828 slugs are ambiguous across page types.

# Evidence

Measured 2026-08-28 at `196e90c878`.

The winner is the first page a corpus walk reached, not a priority order. `slugsIn` at `tools/lib/domain.ts:53-57` keeps the first claim on a bare key and files every later one under `duplicates`, which `resolveSlot` never reads; the walk order is `listDocuments`'. `alan` is claimed by eight page types and `agent/seat/alan.seat.md` sorts first, so `--person alan` resolved to a seat.

Counted over the 59,030 pages carrying a slug and a page type: 57,483 distinct slugs, 828 of them held by more than one page type, and 267 held twice within one page type.

The cure already exists and is unused. `slugsIn` also keys every page by `<page-type>/<slug>` at `:39-52`, written after the bare keys at `:64` so an address never loses. `resolveSlot("domain", "person/alan", …)` answers `pages/person/alan.person.md` today, and `person/nobody-at-all` refuses.

Four callers reach the ambiguous branch. `tools/lib/message-to-person.ts` wanted a known page type and now asks by address. The other three — `tools/lib/message-to.ts:75` and `tools/lib/seat-resolve.ts:189, :200` — pass a slug the caller typed, whose page type is genuinely open: a seat states a domain as `domain/global`, `page-type/persona` or `file-kind-domain/file-kind-ts`, so narrowing them to `.domain.md` would refuse valid input. Making `resolveSlot` refuse instead changes every one of them.

Not measured: how often a bare slug reaching those three lands on the wrong page in practice.
