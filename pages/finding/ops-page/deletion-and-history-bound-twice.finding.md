---
id: 3eba5c88-3bd7-53d7-b935-5f09583afa5b
slug: deletion-and-history-bound-twice
page-type-slug: finding
title: "Deletion and history are bound twice and the pairs disagree"
domain-slug: domain/ops-page
---

# Claim

Deletion and history are each bound by two documents that disagree. `domains/page-storage.md` states that a page has one kind of deletion and it removes the file, and that a page's history is its repo's history. `domains/ops-page.md` states that no command there removes a page, that a delete is a stamp another command clears, and that a write leaves a row in the page's history. `ops-page.md` defines itself as covering a page of any type, so both pairs reach file-backed pages and cannot both hold.

# Evidence

Read both documents in full. I did not read `tools/commands/page/*.ts` to establish which behaviour the commands actually implement, so which of the two pairs is the true one is unsettled — only that they contradict.
