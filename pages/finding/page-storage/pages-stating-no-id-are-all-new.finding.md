---
id: 01a047a6-4476-7b86-8342-921a401758fd
slug: pages-stating-no-id-are-all-new
page-type-slug: finding
title: "109 of 59,086 file-backed pages state no id, and every one of them was written in the last two days"
domain-slug: domain/page-storage
---

# Claim

The Intent entry "A page's id is in its frontmatter, or among a row's keys" is not yet true, and what is left of the gap is being made rather than inherited. 109 of 59,086 file-backed `.md` pages state no `id:`. Every one of them entered this repository on 2026-08-27 or 2026-08-28, so the corpus behind them has been re-minted and only the new pages are short. 88 of the 109 are findings, and 20 of those were written today, across 15 domains.

# Evidence

Measured 2026-08-28 at `8220f5d1d2d08b7989ad11f206035ffaa6b57b4f` on `main`, RUN not read, over akasha and code-editor, the two repositories `pages/repo/` names.

Method for the `.md` half: read every `files:` glob off `pages/page-type/*.page-type.md` — 380 page-type documents, 315 of them declaring a glob into a repository that stands — expanded each with Bun's Glob against its named repository, skipping `node_modules/` and `dirty/`, and tested each file's frontmatter for `^id:\s*\S`. 59,086 pages matched; 58,977 state an id; 109 do not.

A second pass agreed: over ripgrep, every `.md` file carrying a `page-type-slug:` line, tested for an `id:` line, counts 59,148 files and 108 without one. The two populations differ by which files a glob claims; the shortfall does not.

The three types with any page missing an id, as `missing/total`: finding 88/3101; story-chapter-royal-road 15/17908; message 6/68.

Each of the 109 was dated by the commit that added it, `git log --diff-filter=A`: 89 on 2026-08-27, 20 on 2026-08-28. The 20 from today are all findings, filed under agent-evidence, akasha-repo, checks-system, deploy-system, ops-cli, ops-finding, ops-service, ops-tests, page-property-definition, page-queries-system, page-storage, page-storage-uncommitted, pages-system, read and test-file.

Method for the sidecar half: JSON-parsed every line of every `*.jsonl` outside `node_modules/` and `dirty/` in both repositories, testing for a non-empty string `id` at the top level. 4,565,564 rows, 0 unparseable, all stating an id.

`idOfFilePage` at `shared/pages-access/src/file-rows.ts:152` returns the stated `id:` or else `idDerivedFrom(at)`, a uuid v5 over the string `<repo>:<relative path>`, which is why a page stating none still answers with one.

This replaces a reading taken 2026-08-20, which found 22,745 of 57,726 pages and 11,384 of 352,873 rows short, naming story-chapter-royal-road, finding and page-property-definition as holding 22,311 of the shortfall, over four repositories since absorbed into this one.
