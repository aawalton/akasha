---
id: be6ba67e-05b4-55cf-884d-acb19f32b37e
slug: product-json-frozen
page-type-slug: finding
title: "Product JSON frozen"
domain-slug: domain/code-editor
---

# Claim

Alan's cut of VS Code cannot be renamed, because the seed's inherited pre-commit hygiene check refuses every change to `product.json` while the fork ships an Open VSX `extensionsGallery`.

# Evidence

Found on 2026-08-04 by the seat on #17747, which hit it renaming the product for Alan's browser tab, reverted, and recorded it in the cut's README.

`build/hygiene.ts` in `/var/home/walton/code-editor` refuses any `product.json` carrying an `extensionsGallery` key. Microsoft's own `product.json` carries none — theirs is injected at build time — so upstream never meets the rule. This fork descends from openvscode-server, which ships an Open VSX gallery in the committed file, so the key is always present and the check refuses every change to that file rather than the ones it was written for.

The visible cost today is small and exact: the browser tab reads `code - OpenVSCode Server Dev` rather than any name Alan chooses for his own editor.

The wider cost is that `product.json` is where a cut declares what it IS — name, icon, URLs, quality — and this one cannot declare any of it. The domain vision says Alan owns the editor he works in and that it diverged permanently, with nothing kept because upstream keeps it. A check inherited from upstream that freezes the file naming the product is that vision refused by leftover machinery.

Nothing about it is subtle to fix and nothing about it was this row's to decide: the check is upstream's, the cut is a permanent divergence, and what to do with an inherited rule that refuses a legitimate change is the kind of judgement a divergence exists to make.
