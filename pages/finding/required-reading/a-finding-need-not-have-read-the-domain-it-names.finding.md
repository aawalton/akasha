---
id: 7c4e91a2-5b38-4d61-8a0f-2e9c6b4d7315
page-type-slug: finding
title: "A finding need not have read the domain it names"
slug: a-finding-need-not-have-read-the-domain-it-names
domain-slug: domain/required-reading
---

# Claim

A `.finding.md` write requires three documents: the akasha repo page and the `finding` and `page` page types. The domain its `domain-slug` names is not among them, and no seed reaches it. So a finding is filed against a domain, sited by its folder and judged by its Design lines, by an agent that need never have read it. Whether that reading should be required is Alan's — it changes how a page type states required reading (`pages/page-type/domain.page-type.md:53`).

# Evidence

Measured 2026-08-28 at `b197886bb3`.

The required set, as `ops read` reports it at a finding's foot: `pages/repo/akasha-repo.repo.md`, `pages/page-type/finding.page-type.md`, `pages/page-type/page.page-type.md`. The same three at each of four finding paths, in two folders.

`page/required-reading/required-reading.ts:172-211` seeds from `required-reading-slugs`, the repo and package pages, the file extension and endings, the body's headings, pages naming this file, and the page type chain. No seed reads `domain-slug`.

Probe: a finding declaring `domain/design-system`, a page I had not read, landed at `d4dab091a1` — 11 checks, none refused — and was taken out at `b197886bb3`.

Positive control, same path and page type, differing by one heading: with a `Help` heading added the write was refused, `read-before-write` reporting `NOT YET READ` for `pages/page-body-section/old-ops-command-help.page-body-section.md`, and nothing was written. So the gate runs here, binds a delegate, and refuses.

Cost: 3,180 findings name 332 distinct `domain-slug` values, and reading one cold is not one file: `pages/domain/agent-harness.domain.md`, named by 247, hands 9 documents and 311 lines.

For requiring it: a domain's Design lines decide whether a finding is sited right and whether its claim is coherent there. `pages/domain/declared-reading.domain.md:12` reads "what must have been read for what something is declared to be". Misfiling is already common — see `pages/finding/finding/every-misfiled-finding-declares-the-same-domain.finding.md`; that unread domains cause it is not established here.

Against: the cost falls on every write by every agent, and a finding is "something noticed about a domain, written down before anyone judges what it means" (`pages/page-type/finding.page-type.md:16`). Requiring a whole domain read before noticing may suppress the noticing, which is the thing findings exist to make cheap.

Not measured: how many of the 332 named domains a writing agent would have read anyway.
