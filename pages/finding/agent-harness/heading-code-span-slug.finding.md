---
id: f643bd8d-759b-5cd9-a9e6-7fdd819b09d4
page-type-slug: finding
title: "The links gate strips inline code before slugifying, so an anchor onto a code-span heading cannot resolve"
domain-slug: domain/agent-harness
---

# Claim

The links gate slugifies a heading after inline code has been stripped from it, so an anchor onto a heading that ends in a code span cannot resolve.

# Evidence

`headingSlugs` in `tools/lib/links.ts` reads from `proseOnly(body)`, which removes code spans before the heading text is slugified. The heading `#### The multiplicative refinement — \`arousal × safety = attraction\`` reaches the slugifier as `The multiplicative refinement —` and yields `the-multiplicative-refinement`, while a browser resolves `#the-multiplicative-refinement--arousal--safety--attraction`.

One link in the books repo hit this. It was unlinked rather than repointed, because the slug the gate accepts is the one a reader's browser does not.
