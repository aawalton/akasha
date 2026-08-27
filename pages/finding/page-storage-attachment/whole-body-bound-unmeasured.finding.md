---
id: e9cd6698-defa-5b2c-bca9-a8b24144292d
slug: whole-body-bound-unmeasured
page-type-slug: finding
title: "A whole-body length bound is claimed and nothing measures one"
domain-slug: domain/page-storage-attachment
---

# Claim

`pages/domain/page-storage-attachment.domain.md:15` states that every page is measured against a length its whole body must fit. Nothing measures a whole body. A page body shape bounds blocks, slots, choices and holes, and no file in `pages/page-body-shape/` carries any key beyond those and `extends-slug:`. The line reads as the warrant for attachments existing, and the mechanism it names is not there.

# Evidence

A delegate enumerated the properties of a body shape and the keys present across `pages/page-body-shape/`; I approved this line myself on 2026-08-20 without checking that the bound it names exists. I did not search the code repository for a whole-body measurement, so the claim rests on the instructions repository alone. the `file-length` check at `checks-system/check/file-length/file-length.check.code.attachment.ts` does bound a file's bytes, which is a different thing from a body shape measuring a body.
