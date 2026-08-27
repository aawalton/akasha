---
id: e76ab62f-c6dd-52d5-8ab9-5560c07ce1ca
page-type-slug: finding
title: "User-facing refusals in the code repository name the retired large and data keys"
domain-slug: domain/pages-system
---

# Claim

The code repository still names the retired `large:` and `data: jsonl` declarations in text a person reads. `file-write-values.ts:26` tells an author whose write failed to declare `large:` or use a `data: jsonl` sidecar; `guards.ts:35` repeats the second; `file-read.ts:263` warns about "large properties". The keys are now `attachment:` and `rows`, so an author following any of them declares nothing.

# Evidence

A delegate read and quoted all three strings; I confirmed the vocabulary against `domains/page-storage-attachment.md` and `domains/page-storage-rows.md` and against the migration I ran, which reached the instructions repository only. I did not run the failing write that produces the first message, so I have not seen it rendered.
