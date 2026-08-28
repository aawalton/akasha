---
id: 6a5828dd-8d3a-5972-aa8e-59ca73c7af5a
slug: carries-an-id-reads-two-ways
page-type-slug: finding
title: "Every page carries an id turns on a word, and the two readings give opposite answers"
domain-slug: page-property-definition/page-id
---

# Claim

"Every page carries an id" turns on a word, and the two readings give opposite answers. Read as "reads back with one" it is already true — every page answers with an id, derived from its path where none is stated. Read as "states one" it is false for 22,745 of 57,726 file pages and 11,384 of 352,873 sidecar rows. Alan's ruling that sidecar rows "should have unique ids" points at the second reading, so the entry stays; its wording is what needs settling.

# Evidence

Measured 2026-08-20T14:47:37Z, RUN across all four page repos (instructions ca170a783, memory 09ff68d3b, books 4b75838, stories cfd62be19).

Stated ids, `.md` half: expanded every `files:` glob declared on `page-types/*.md` and tested each matched file's frontmatter for `^id:\s*\S`. 57,726 pages; 34,981 state an id; 22,745 do not, across 17 page types. Three types hold 22,311 of the shortfall: story-chapter-royal-road 17,709 of 17,709, finding 3,184 of 3,184, page-property-definition 1,418 of 2,155. A second independent pass counting every `.md` carrying a `page-type-slug:` key agreed on the same 34,981.

Stated ids, sidecar half: JSON-parsed every line of every `*.jsonl` outside `node_modules/` and `dirty/` and tested for a non-empty top-level string `id`. 352,873 rows, none unparseable; 341,489 state one; 11,384 do not, over 189 files. 10,946 of those are monarch transactions, where 0 of 10,946 state one.

Carried ids: asked through the page query service, a page stating nothing still answers with one. `finding` answers n=3,184 and returns `id: 2a1f48d7-6d49-5b8c-b84f-c4c9f5dfabd0` for a file stating none; `monarch-transaction` answers n=10,946 and returns `id: 37e1a51d-9966-57df-ba21-225dd1363a65` for the row at `memory:monarch/months/2021-07.transactions.jsonl#0`. Both are uuid5 rather than uuid7, which is the mark of derivation.

The two readings are not equally safe. A derived id is a function of the page's path, and `pages/domain/page-storage.domain.md:19` states as Design that "A page's path can change without the page changing" — so under the first reading the id a page carries is not stable against the very move that Design permits. For a sidecar row the derivation is the line index, so inserting one line re-identifies every row below it.

I did not find any page that reads back without an id, and I did not search exhaustively for one; I sampled two types chosen because they state none.
