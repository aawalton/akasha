---
id: 25900719-7440-5d81-9c76-8f2c4319bb3f
slug: id-in-frontmatter-still-short
page-type-slug: finding
title: "22,745 of 57,726 file-backed pages state no id, concentrated in three page types"
domain-slug: domain/page-storage
---

# Claim

The Intent entry "A file-backed page's id is in its frontmatter" is not yet true, and stays. 22,745 of 57,726 file-backed `.md` pages state no `id:`, and the shortfall is concentrated rather than diffuse: three page types carry 22,311 of it. The sidecar half is nearly shut — 11,384 of 352,873 rows carry none, 10,946 of them `monarch-transaction`, whose every row states none. A page stating no id still reads back with one, derived from its path, so nothing fails loudly while this stands.

# Evidence

Measured 2026-08-20T14:47:37Z, RUN not read, across all four page repos (instructions ca170a783, memory 09ff68d3b, books 4b75838, stories cfd62be19).

Method for the `.md` half: read every `files:` glob off `page-types/*.md` (367 types declare one), expanded each with Bun's Glob against its named repo, and tested each matched file's frontmatter for `^id:\s*\S`. 57,726 pages; 34,981 state an id; 22,745 do not. A second, independent pass counting every `.md` file carrying a `page-type-slug:` key agreed on the same 34,981.

The 17 types with any page missing an id, as `missing/total`:
story-chapter-royal-road 17709/17709; finding 3184/3184; page-property-definition 1418/2155; page-type 72/367; code-editor-group-tab 72/72; monarch-month 62/62; monarch-category 54/54; code-editor-terminal 52/52; code-editor-group 36/36; monarch-account 31/31; daily-tracking 30/121; game 8/8; temper-completed-month 6/6; code-editor-window 4/4; idle-persona-card 3/140; monarch-holding 3/3; monarch-tag 1/1.

Three types hold 22,311 of the 22,745: story-chapter-royal-road, finding, page-property-definition.

Method for the sidecar half: JSON-parsed every line of every `*.jsonl` outside `node_modules/` and `dirty/`, testing for a non-empty string `id` at the top level. 352,873 rows, 0 unparseable; 341,489 state an id; 11,384 do not, spread over 189 sidecar files. By sidecar kind: transactions 10,946 across 62 files; affix-scripts 119; quality-values 115; effects 96; signature-scripts 92; passive-effects 16.

`memory:monarch/months/*.transactions.jsonl` is 0 of 10,946 stated, RUN with a Python json pass over the 62 files.

That a stated id is absent does not make the page unreadable. RUN against the page query service: `finding` answers n=3184 with `id: 2a1f48d7-6d49-5b8c-b84f-c4c9f5dfabd0` for a file stating none, and `monarch-transaction` answers n=10946 with `id: 37e1a51d-9966-57df-ba21-225dd1363a65` for `...2021-07.transactions.jsonl#0`. Both are uuid5, derived from the page's `at`.
