---
id: b7d00cc6-3fae-5737-b44c-e08ac1cedcae
slug: search-misses-content
page-type-slug: finding
title: "Search misses content"
domain-slug: domain/pages-system
---

# Claim

`ops page list --search` matches on title alone, while its own help calls it "Full-text
search across title and content". Neither `getPages` nor `collectPages` is passed
`includeContent`, so the `content` column is never selected and the client-side comparison
runs against an empty string on every row. Under `--all` and `--count` the resulting zero
reads as complete — `truncated: false`, `count: 0` — so an audit for a phrase in a page
body gets a confident wrong answer rather than a flagged partial one.

# Evidence

Run live on 2026-08-07 against the `story-chapter` type, which holds 10447 rows.

Page `019fdc31-8777-78b9-a7f6-0bef68044c00` has `Wordsworth` in its content-tier `text`:

    $ ops page show 019fdc31-8777-78b9-a7f6-0bef68044c00 --properties text --json
    {…"text":"\"The Child is Father of the Man\"\n\nWilliam Wordsworth\n\nBel Air…

No chapter title holds the word. All three modes return nothing:

    $ ops page list --type story-chapter --search Wordsworth --json
    {"pages":[],"truncated":true,"count":null,"next_cursor":"eyJ2YWx1ZXMi…"}
    $ ops page list --type story-chapter --search Wordsworth --count
    0
    $ ops page list --type story-chapter --search Wordsworth --all --json
    {"pages":[],"truncated":false,"count":0,"next_cursor":null}

The bounded page flags `truncated: true`. `--all` and `--count` do not — those are this
CLI's own shapes for "complete". The control passes: `--search "Cat's in the Cradle"`, a
title substring, returns the row.

`packages/shared/pages/cli/src/page/list.ts:140-148` lowercases `propsMap.content` and
drops the row when neither title nor content contains the term.
`packages/shared/pages/cli/src/lib/list-fetch.ts` calls `getPages` and `collectPages`
without `includeContent`; `grep -n includeContent` across `page/list.ts`, `lib/list-fetch.ts`
and `entity-surface/verbs/list.ts` returns nothing.
`packages/shared/pages/access/src/get.ts:37` returns `PAGES_COLUMNS_NO_CONTENT` for
anything but `includeContent === true`, and its header at lines 41-48 records that
content-tier values sit in a separate `content` column a pushed projection reads as NULL.
