---
id: 12bbb138-18bc-59ba-b9bc-43f6d093c144
slug: id-said-required-and-is-not
page-type-slug: finding
title: "ID said required and is not"
domain-slug: domain/global
---

# Claim

`tools/page-id.ts` states twice that `properties/page/id.md` declares `id` required. That file declares `identifying: true` and no `required:` at all. The corpus could not bear the claim being made true: 4,086 of the 4,209 pages the registry claims across the two repos carry no `id:` key, so `required: true` on that property would refuse every one of them at the gate.

# Evidence

`properties/page/id.md` holds four keys — `id:`, `defined-on-page-type-id:`, `type: uuid` and `identifying: true`. `required:` is not among them. `tools/page-id.ts` says otherwise in its header at lines 5-6 ("declares the key required and identifying") and again in the text `--help` prints, at line 76.

Only one half of the sentence is enforceable. `propertiesFor` in `tools/lib/page-frontmatter.ts` reads `type`, `required` and `computed` off a property document and nothing else, at lines 336-338; `identifying:` reaches no reader in `tools/`. So the half that is true is the half nothing acts on, and the half that is acted on is the half that is false.

Measured on 2026-08-13 by running the gate's own path — `propertiesFor` then `judgeFrontmatter` — over every page the registry claims in both repos, with `required` bent to `true` on the `page` property `id` and nothing else changed. 4,209 pages judged, 123 clean, 4,086 refused, each with `` `id` is required on `page` and this states none ``. The 123 that carry one all stand in the instructions repo, under `page-types/`, `properties/` and `page-property-types/`; no page in the memory repo carries an `id:` key.

The same sweep run against the corpus as it stands refuses nothing, so this is a claim about a constraint that was never landed rather than a drift out of one that was. `domains/page-type-backing-file.md` states as Intent that a file-backed page's id is in its frontmatter — not yet true of 4,086 pages, which is what makes the Intent line an Intent line and the `page-id.ts` sentence a misreading of it.
