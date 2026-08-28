---
id: bbe7df88-ee7b-4416-88cf-9737a9951a2f
slug: no-sidecar-row-is-judged-against-its-declared-type
page-type-slug: finding
title: "No sidecar row is judged against its declared type"
domain-slug: domain/pages-system
---

# Claim

`judgeRow` evaluates no value rule, so none of the 4.7 million rows in the sidecar half of the store is judged against the type its property declares. It reads a set of declared names, refuses an undeclared key and a required key dropped from a standing row, and returns a clean verdict, indistinguishable from one that checked the values and found them sound. Four findings in this domain already record consequences of it. The file half of the store is judged; the row half is not.

# Evidence

`judgeRow` stands at `page/property/judge.ts:203-226` as of `4b18b9ea`, having moved from `:184-207` earlier the same day, so cite it by name rather than by line. Its body builds a set of declared names, refuses each key not in that set, then where a standing row is passed refuses each required key dropped from it, and returns. It never reads `Property.type`, never calls `armFor`, and never reaches `RULES` or any `rule.holds`. It takes no vocabulary, so it could not arm a rule if it wanted one; `armFor` has two callers and both sit inside `judgeFrontmatter`.

Every path to a row judgement is that one function: the check at `checks-system/check/page-holds-to-its-type/rows.ts:101`, and the write path at `tools/lib/page-rows-write.ts:148`, `:218` and `:306`. There is no second carrier and no raw-JSON judgement behind it, so a row's declared type is unenforced on read and on write alike.

Measured 2026-08-28: 11,570 `.jsonl` sidecars under `pages/` holding 4,705,872 rows. That total drifts as agents append, moving by thousands between readings taken minutes apart, and is recorded here as an order rather than a constant. The markdown half, about 59,000 pages, is judged by `judgeFrontmatter`, which does arm and evaluate rules.

`pages/domain/pages-system.domain.md:36-40` carries Answer Or Refuse: refuse where you cannot answer rather than answering as though there were nothing, a true empty and a failure reading alike with only one of them a fault. A judgement evaluating nothing returns an empty refusal list, the same value a judgement that checked everything and found it sound returns, and nothing downstream can tell the two apart. Consequences already filed: `a-map-can-never-satisfy-its-declared-type-on-a-row`, `a-row-and-a-file-spell-an-absent-value-differently`, `a-row-type-check-is-too-costly-as-a-per-request-fault`, `reference-rows-carry-a-display-label-where-a-slug-is-declared`.
