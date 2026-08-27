---
id: 676a9063-8641-5b75-8510-793388f8be44
slug: reference-keys-typed-as-slugs
page-type-slug: finding
title: "Reference keys typed as slugs"
domain-slug: domain/global
---

# Claim

Three frontmatter keys name a document and are typed as slugs, so each admits a name nothing resolves. `domain:` on the finding and initiative schemas and `domain-parents:` on the domain schema validate shape alone, and a value naming no domain that exists conforms, sorts and reaches nobody.

# Evidence

Measured 2026-08-02, first-hand.

`tools/document/schemas/finding.ts:20` and `tools/document/schemas/initiative.ts:20` both declare `{ part: "key", name: "domain", cardinality: once, value: slug }`. `tools/document/schemas/domain.ts:90` declares `domain-parents:` as `slugOrList`. All three name a document; none is typed as a reference to one.

The reason is recorded in `tools/lib/finding.ts`: `domain:` "is typed as a bare slug because `docref` resolution is unimplemented, and `findings-sorted.ts` deliberately declines to assert that the slug resolves — so `domain: findinsg` conforms, sorts, and reaches nobody, appearing only in `owns.ts`'s `unreachedFilings`, which is a read nobody is obliged to run."

`domain-parents:` is the same shape and carries no such note anywhere.

This is filed because the reason is about to stop being visible. `docref` is being taught to resolve, which falsifies the claim that a reference-typed key admits any text — but these three keys are not reference-typed, so the change does not reach them. It removes their justification without removing their exposure. A workaround whose justification has expired reads exactly like a design, and the only surface stating that these keys are references wearing slugs is `findings/instructions-harness/docref-unresolved.md`, which that same change deletes.

`resolve: "key"` is the arm that would serve all three — a lookup matching the text against some surface's `domain-slug:` rather than treating it as a path. It exists in `tools/document/types.ts` today with no user anywhere in `tools/document/schemas/`, and is being deleted in the same change rather than left built and inert, on the ground that an unbuilt thing should be recorded as unbuilt. Converting these keys is what rebuilds it, beside its first user.

The conversion is not free and that is why it is not being done in passing: `domain:` is carried by every finding and every initiative in the store, so retyping it rewrites the validation of a key on every document of two kinds at once.
