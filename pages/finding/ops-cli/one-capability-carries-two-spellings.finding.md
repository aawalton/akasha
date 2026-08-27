---
id: 0ede7df0-b3bc-5c6f-acfe-5fb9d5e653b6
slug: one-capability-carries-two-spellings
page-type-slug: finding
title: "One capability carries two spellings"
domain-slug: domain/ops-cli
---

# Claim

The pages access library is named two ways in this repository. `tools/lib/pages-access.ts` names it by file path, `packages/shared/pages/access/src/index.ts`; the `page-type` and `property-definition` verbs name the package specifier, `@shared/pages-access`. Both resolve to the same module.

# Evidence

Found 2026-08-13 by the seat moving the `property-definition` bodies, which named it as the horizontal change it could not see the whole of.

Ubiquitous Naming asks for one name per concept across code, data, interface and prose, and its warrant is that a second spelling reads as a second thing while each layer stays consistent within itself — so nobody meets both names at once. That is exactly the shape here: a reader inside either namespace sees one consistent spelling and no reason to suspect another exists.

The two are not equivalent for every purpose, which is what makes the choice real rather than cosmetic. A `packages/**.ts` path is checked by `tools/checks/code-paths-resolve.ts`, which measures that every such path still stands in the code repository. A package specifier resolves through the package's own `exports` map and is checked by nothing here — it fails at run time instead.

So the path form buys a standing check and the specifier form buys independence from the code repository's internal layout. Whichever is chosen, it should be chosen once. Deciding it needs a view across every namespace, which no single moving seat has.
