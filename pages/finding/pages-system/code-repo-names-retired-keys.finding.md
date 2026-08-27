---
id: e76ab62f-c6dd-52d5-8ab9-5560c07ce1ca
slug: code-repo-names-retired-keys
page-type-slug: finding
title: "User-facing refusals in the code repository name the retired large and data keys"
domain-slug: domain/pages-system
---

# Claim

Akasha still names the retired `large:` and `data: jsonl` declarations in text a person reads. `shared/pages-access/src/file-write-values.ts:46` tells an author whose write failed to declare `large:` or use a `data: jsonl` sidecar; `shared/pages-access/src/guards.ts:35` repeats the second; `shared/pages-access/src/file-read.ts:265` warns about "large properties". The keys are now `attachment:` and `rows`, so an author following any of them declares nothing.

# Evidence

A delegate read and quoted all three strings; I confirmed the vocabulary against `pages/domain/page-storage-attachment.domain.md` and `pages/domain/page-storage-rows.domain.md` and against the migration I ran, which reached the instructions repository only. I did not run the failing write that produces the first message, so I have not seen it rendered.
