---
id: 9fefb011-9e45-53a5-b1e2-c8ba63f2311e
slug: account-page-states-no-title
page-type-slug: finding
title: "Account page states no title"
domain-slug: domain/temper
---

# Claim

`memory:pages/temper-account/019f99ae-d759-7c20-8bbc-bd1aa353a77a.temper-account.md` states no `title`, and `temper-account` declares `owner-slug: title`, so the page answers no owner narrow and belongs to nobody. The title is not recoverable: the file stem is the page's own minted id rather than a user uuid, and no auth user carries that value. The single `temper-character` pointing at it is a verification fixture minted in the same millisecond.

# Evidence

Measured 2026-08-20 through `getPages` on the live read path. Nothing was written to either page.

`temper-account` holds 4 pages. The other three each spell a uuidv4 auth user id as both their file stem and their `title:`, and carry a separate uuidv7 `id:`. This page inverts that: stem and `id:` are one value, `019f99ae-d759-7c20-8bbc-bd1aa353a77a`, whose version nibble is 7, and it states no `title` at all.

`auth.admin.listUsers` returns 9 users. The three named by the other account pages are `9ba554f7-…` (aawalton@gmail.com), `1077116b-…` (partial-15942@throwaway.alanwalton.com) and `a2e774f8-…` (partial-15937@throwaway.alanwalton.com). `019f99ae-d759-7c20-8bbc-bd1aa353a77a` is not among them, so no user uuid was ever written here to recover.

Its sole referrer is `memory:pages/temper-character/zzverify-planclerk.md`, carrying `account-page: 019f99ae-d759-7c20-8bbc-bd1aa353a77a` and `eso-character-id: verify15938-plan-card`, with its own `id:` `019f99ae-d7cb-75cc-b2fd-22982ed361eb`. Both uuidv7 values share the timestamp prefix `019f99ae-d7`, so account and character were minted milliseconds apart by one run, and `verify15938` sits in the same numbering as the two `partial-159xx` throwaway users.

The owner narrow binds on this type and this page sits outside every set it returns: `temper-account` none=4, userId=Alan 1, wrong-uuid 0, garbage 0. On `temper-character`, none=29, Alan 20, wrong 0, garbage 0, and `zzverify-planclerk` is among the 9 that are not Alan's.
