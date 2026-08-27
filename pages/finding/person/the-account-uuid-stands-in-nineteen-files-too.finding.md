---
id: 0b84af6b-19ac-58d7-913d-64523e360a00
page-type-slug: finding
title: "A person's account uuid still stands as a bare literal in nineteen code-repository files"
domain-slug: page-type/person
---

# Claim

A person's document now states the account they sign in with, and the same uuid still stands as
a bare literal in nineteen files of the code repository. Measured 2026-08-20, after the mapping
arrived the same afternoon.

# Evidence

`properties/person-account-user-id.md` and the `account-user-id:` key on
`domains/persons/alan.md` came in `d06753944`, "person: a person's document states the account
they sign in with". Three of the seven person documents state it -- `alan`, `jenny` and `ki`;
`david`, `joseph`, `katara` and `lizzy` do not.

Alan's, `9ba554f7-cb18-48bb-a709-ec935a895ca7`, appears as a bare string literal in **19 files**
under `packages/` outside `dist`. Fifteen are tests, each re-spelling it as a local constant --
`USER`, `ALAN`, `ALAN_UUID`, `ALAN_ACCOUNT`, `identity.userId`. Four are not tests:

    packages/shared/supabase/auth/src/user-id.ts
    packages/shared/database/migrations/8297_reassign-stale-user-id/expand.sql
    packages/alanwalton/apns-push-notifier/src/_push-test-helpers.ts
    packages/temper/scripts/src/migrate-catalog-version-fields-9729.script.ts

`tools/lib/user-id.ts` in the instructions repository carries it too, as the default for
`USER_ID` where the environment states none.

`Ubiquitous Naming` says a name moved in one layer and not the rest is two names. The page now
holds the mapping, so the literals are a second spelling of something a file states rather than
the only place it is written down. Whether they are worth moving is a judgement about what
reading a page costs a test, which the count does not settle.

One thing that does not change with it: every file-backed page reads back as
`UNIVERSAL_USER_ID`, `ffffffff-ffff-ffff-ffff-ffffffffffff`, whatever owner its file states --
`page-types/page.md` already records this. So a person's account uuid never appears on a page of
theirs as its owner; it is a value carried, not a key joined on.
