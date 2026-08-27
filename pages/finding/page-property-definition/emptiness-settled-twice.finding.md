---
id: b0c8aa20-4168-5a4f-beaf-fefaac73d9b9
page-type-slug: finding
title: "Emptiness settled twice"
domain-slug: page-type/page-property-definition
---

# Claim

Emptiness is settled in two places that do not agree: the `text` type bakes non-emptiness into the type itself, while `blank:` on a property definition wraps any type's rule to admit nothing at all.

# Evidence

Measured 2026-08-14. Alan raised the doubt; this records it before anyone judges it.

`tools/lib/page-value.ts:131` states the `text` rule as `scalarRule("a non-empty value", (text) => text !== "")`, and `scalarRule` trims before testing, so a value of only whitespace fails. Non-emptiness is therefore a fact about the type rather than about the property.

`blanked` at `tools/lib/page-value.ts:268` wraps any rule so an empty or whitespace value passes, reading "…, or nothing at all". It is reached from `page-frontmatter.ts:245` when the property definition states `blank: true`.

Exactly one property in the repo states it: `properties/learn-everything-topic/calibration.md`, which is `type: number | text` with both `blank: true` and `required: true` — so the key must be present and may say nothing. Whether that pair is one concept or two is not settled here.

The question this raises: whether emptiness belongs to the type at all, or belongs wholly to the property definition, leaving every type to describe only the shape of a value that is there.
