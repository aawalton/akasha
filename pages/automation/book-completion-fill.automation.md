---
page-type-slug: automation
id: 019f143e-69df-7384-9166-07c6645e472b
title: "Book completion fill"
slug: book-completion-fill
enabled: true
trigger: '{"from":{"kind":"is_empty"},"kind":"property_changed_to","propertyId":"completedAt","to":{"kind":"is_not_empty"}}'
actions: '[{"kind":"patch_source","set":{"progress":"=source.length","status":"Completed"}}]'
---

Would fill a book's progress to its length and mark it completed, as its twin does for an episode. It names no page type to watch, so nothing loads it — the `book` it was written for stands at `books:*.md` under an id its trigger never named.
