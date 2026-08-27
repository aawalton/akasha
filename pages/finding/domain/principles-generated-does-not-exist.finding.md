---
id: 6a457e30-7daf-5d16-9367-d7d4f8bbe4fb
slug: principles-generated-does-not-exist
page-type-slug: finding
title: "Principles generated does not exist"
domain-slug: page-type/domain
---

# Claim

`tools/document/schemas/domain.ts` states that a principle stands in exactly one document, and the check its neighbours name as enforcing this does not exist.

# Evidence

`domain.ts:218`, over the `# Principles` section: "Authored here, and this is the only place each principle stands."

`principles-generated` is named as an instrument in three files — `tools/checks/glossary-generated.ts`, `tools/lib/glossary-manifest.ts` and `tools/checks/documents-conform.ts` — and no such file exists under `tools/checks/`. Nothing anywhere compares principle text across documents.

The claim itself has an authority: `domains/instruction.md` carries it. So this is not a claim without a home; it is a claim whose enforcement three files assert and none provides, which reads to anyone opening them as though a check held it.
