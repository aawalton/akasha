---
id: 3709b4e0-2278-5be1-bc19-a5c24315c5a1
slug: frontmatter-exceptions-incomplete
page-type-slug: finding
title: "The line saying where a written property lands omits attachment and rows"
domain-slug: domain/page-storage
---

# Claim

`domains/page-storage.md` states that a written property is in a page's frontmatter unless it is the body, a secret, or uncommitted. An attachment property and a rows property are none of those and neither stands in frontmatter, so the line as written sends an author to the wrong place for both. The same document already names attachments at line 32, so it contradicts itself.

# Evidence

Read `domains/page-storage.md` in full, against `domains/page-storage-attachment.md` and `domains/page-storage-rows.md`, which each state that the value stands beside the page. Both kinds are live: 26 property definitions declare `attachment: md`, and rows sidecars stand beside persona pages. I did not check whether any code follows the frontmatter line literally.
