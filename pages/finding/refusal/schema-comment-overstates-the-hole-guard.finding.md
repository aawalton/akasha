---
id: 1b58aa11-1341-5e0b-a630-ee4134022ee8
page-type-slug: finding
title: "Schema comment overstates the hole guard"
domain-slug: page-type/refusal
---

# Claim

The comment on `holes:` in `tools/document/schemas/refusal.ts` says `holes.ts` "reads this and holds the body to it", which reads as a write-time guarantee it does not give: `holeFaults` returns empty where the key is absent, so a write that drops the declaration passes every gate and only `refusals-bound` catches it afterwards.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/disabled-hook-unresolved.md` dispatched from `review-documents`. The reading established the behaviour by stripping the key from a copy; the sources were read here.

`tools/document/holes.ts`, `holeFaults`: `const key = doc.frontmatter.find(...); if (key === undefined) return []`. So the scan is opt-in on the declaration it is meant to police.

The reading measured both halves. With `holes:` stripped, every write gate passes. Driving `refusalsBound` over the same stripped copy fails. So the key is load-bearing and the check is what holds it, not the gate the comment sits on.

The cover is partial rather than absent, which a later reading of `refusals/domain-owner-not-a-parent.md` established and which corrects the shape of this claim. Dropping one MEMBER of the list is refused by `document-conforms` at write time: `holeFaults` reports the body's mark as undeclared. Only dropping the whole KEY escapes, because that is the branch that returns early. So the comment holds wherever a declaration exists, and fails exactly where there is none to read.

What the window costs: between a write that drops the declaration and the next check run, the refusal renders a literal `{path}` to whoever it stops.

The opt-in is a measured decision rather than an oversight — `holes.ts` records that the scan is opt-in because 277 memory documents carry brace runs that are not holes — so what stands is the comment claiming more than the code does, not the code being wrong.

Not measured: whether any refusal has ever lost its declaration in a landed commit, or how long a window between a write and a check run typically is.
