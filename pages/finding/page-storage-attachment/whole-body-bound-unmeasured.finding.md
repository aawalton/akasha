---
id: e9cd6698-defa-5b2c-bca9-a8b24144292d
page-type-slug: finding
title: "A whole-body length bound is claimed and nothing measures one"
domain-slug: domain/page-storage-attachment
---

# Claim

`domains/page-storage-attachment.md` states that every page is measured against a length its whole body must fit. Nothing measures a whole body. A page body shape bounds blocks, slots, choices and holes, and no file in `page-body-shapes/` carries any key beyond those and `extends-slug:`. The line reads as the warrant for attachments existing, and the mechanism it names is not there.

# Evidence

A delegate enumerated the properties of a body shape and the keys present across `page-body-shapes/`; I approved this line myself on 2026-08-20 without checking that the bound it names exists. I did not search the code repository for a whole-body measurement, so the claim rests on the instructions repository alone. `token-ceiling` does bound a file's bytes, which is a different thing from a body shape measuring a body.
