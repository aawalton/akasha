---
id: a40baa78-5a6a-5ff9-8cb8-b7ee0eaa9d61
slug: bulk-exemption-framed-as-caller-discipline
page-type-slug: finding
title: "Bulk exemption framed as caller discipline"
domain-slug: domain/pages-system
---

# Claim

Two write-boundary guard headers state the bulk path's exemption as a fact about who happens to
call the verb today. In the proc they name, both exemptions are closed structurally by a raise. That
framing is the one that would license deleting the raise, because a guard resting on caller discipline
is redundant once its callers are audited and a guard closing a class is not.

# Evidence

Read 2026-08-07 against `~/code` at main `13135651993c19af09ce41b6295264191071d3c1`.

`_enforce_content_storage.ts:48-49` closes its coverage enumeration: "`pages_bulk_upsert` is the
documented exemption (its only callers are structured-data bulk imports on content-free page-types)".
The parenthesis is a claim about the current caller set.

The proc it names does not rely on that. `pages-bulk-upsert.ts:118-124` runs an `IF EXISTS` over the
target page-type's materialized `propertyDefinitions` and raises wherever any definition declares
`storage: 'content'`. Its comment at :112-114 states the opposite intent: "Rather than route content
on the bulk path, close the class: fail loud when the target page-type declares ANY content-tier
property, so a future bulk writer of one cannot slip prose back onto the hot path."

The same inversion stands a second time. `_enforce_page_coherence.ts:42` ends its enumeration
"`pages_bulk_upsert` keeps its documented exemption", and `pages-bulk-upsert.ts:128-133` closes that
class the same way, under a comment reading "Sibling guard, same class closure".

Both raises are live and green, and these headers are the only prose either guard has, so nothing
reports the disagreement. All paths are under `packages/shared/pages/proc/src/`.

Found ingesting `dirty/questions/code-repo-pages-prose.md`, which held it as an open question and is
being removed.
