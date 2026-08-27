---
id: 0b84af6b-19ac-58d7-913d-64523e360a00
slug: the-account-uuid-stands-in-nineteen-files-too
page-type-slug: finding
title: "A person's account uuid still stands as a bare literal in nineteen code-repository files"
domain-slug: page-type/person
---

# Claim

A person's document now states the account they sign in with, and the same uuid still stands as
a bare literal in nineteen files of the code repository. Measured 2026-08-20, after the mapping
arrived the same afternoon. The code repository has since become the akasha repository; every path
below is spelled as it stands there.

# Evidence

`pages/page-property-definition/person-account-user-id.page-property-definition.md` and the
`account-user-id:` key on `pages/person/alan.person.md` came in `d06753944`, "person: a person's document states the account
they sign in with". Three of the seven person documents state it -- `alan`, `jenny` and `ki`;
`david`, `joseph`, `katara` and `lizzy` do not.

Alan's, `9ba554f7-cb18-48bb-a709-ec935a895ca7`, appears as a bare string literal in **19 files**
under `packages/` outside `dist` -- the tree that is now akasha's own package folders,
`alanwalton/`, `shared/`, `temper/` and `tools/`. Fifteen are tests, each re-spelling it as a local
constant -- `USER`, `ALAN`, `ALAN_UUID`, `ALAN_ACCOUNT`, `identity.userId`. Four are not tests. The
first still stands, at the path on the right; the other three are not in akasha:

    packages/shared/supabase/auth/src/user-id.ts                              -> shared/supabase-auth/src/user-id.ts:5
    packages/shared/database/migrations/8297_reassign-stale-user-id/expand.sql
    packages/alanwalton/apns-push-notifier/src/_push-test-helpers.ts
    packages/temper/scripts/src/migrate-catalog-version-fields-9729.script.ts

`tools/lib/user-id.ts` -- then the instructions repository, now akasha -- carries it too at line 6,
as the default for `USER_ID` where the environment states none, and `tools/lib/question-page.ts:26`
carries the same default.

`Ubiquitous Naming` says a name moved in one layer and not the rest is two names. The page now
holds the mapping, so the literals are a second spelling of something a file states rather than
the only place it is written down. Whether they are worth moving is a judgement about what
reading a page costs a test, which the count does not settle.

Recorded here as it stood on the day: every file-backed page read back as
`UNIVERSAL_USER_ID`, `ffffffff-ffff-ffff-ffff-ffffffffffff`, whatever owner its file stated, so a
person's account uuid never appeared on a page of theirs as its owner; it was a value carried, not a
key joined on. That is no longer where to look. `page-types/page.md` is gone, its successor
`pages/page-type/page.page-type.md` says nothing about owners, and `UNIVERSAL_USER_ID` is not in
`shared/pages-access/src/sentinels.ts` -- only in the prose of
`shared/pages-access/page-types-interface.md:30`, where it is the marker for the DEFINITION tier
rather than for every page. A file page's owner is now resolved from the file, by
`shared/pages-access/src/file-owner-slug.unit.test.ts`'s subject, and Alan's uuid does stand as the
owner segment of page paths such as `pages/device-secret/9ba554f7-cb18-48bb-a709-ec935a895ca7/`.
