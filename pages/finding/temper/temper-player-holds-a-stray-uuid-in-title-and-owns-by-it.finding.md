---
id: 79f4333f-801a-5820-8150-c01aac677dcd
page-type-slug: finding
title: "Temper player holds a stray uuid in title and owns by it"
slug: temper-player-holds-a-stray-uuid-in-title-and-owns-by-it
domain-slug: domain/temper
---

# Claim

`temper-player` declares `owner-slug: title`, so ownership is read off a field holding a uuid that matches nothing else on the page. All three of its pages carry a `title` uuid different from their own `id`, which is the filename stem. The type declares no `named-for` and no page carries a `slug`, so the name the rules give is the title uuid while the name on disk is the id uuid. Of 12 page types carrying `owner-slug`, only this and `temper-account` spell it `title`.

# Evidence

Measured 2026-08-28 at `d029b287f0`.

`pages/page-type/temper-player.page-type.md:8` is `owner-slug: title`. The type declares no `named-for`, and `extends-slug: page` at `:6` supplies none.

Its three pages, each named on disk for its own `id` and each carrying an unrelated uuid as `title`:

- `pages/temper-player/019de352-16f2-7bdd-861d-2e50edaed4cc.temper-player.md:5` — `title: 9ba554f7-cb18-48bb-a709-ec935a895ca7`
- `pages/temper-player/019f9682-8d0e-7f20-9e27-e3631ae72156.temper-player.md:5` — `title: 4ee54543-cb30-4f47-a8d0-9269b4b7df76`
- `pages/temper-player/019f97d3-0958-75b2-8db1-4c46b19d97c4.temper-player.md:5` — `title: bb51afa8-e63d-4696-a703-ac4fc80839a0`

None carries a `slug`. With no rule and no slug, `nameOf` at `page/name/naming/naming.ts:83-95` reaches the `title` step at `:90-91` before the `id` step at `:92-93`, so the name it computes is the title uuid while the filename stem is the id uuid. Two different uuids for one page.

Exactly 12 page types carry `owner-slug`. Two spell it `title`: this one and `pages/page-type/temper-account.page-type.md:9`. The other ten name a real relation — `account-page` on eight, `player-id` on `idle-persona-card`, `account` on `temper-task`.

`pages/finding/temper/account-page-states-no-title.finding.md` records the same shape on `temper-account`, where a page answers no owner because it states no title.

Not measured: what the three `title` uuids refer to, if anything.
