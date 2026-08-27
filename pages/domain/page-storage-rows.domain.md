---
id: 104acef6-2008-5ae0-86b6-dca69e40eb45
page-type-slug: domain
title: "Page storage rows"
slug: page-storage-rows
domain-parent-slug: domain/page-storage
---

# Definition

- **Page storage rows** — pages of one type kept as lines in another page's companion document rather than each in its own.

# Design

A rows property's value stands beside its page, named for it with `.md` replaced by `.<key>.jsonl`.

A row is upserted by the `slug` or the `id` it carries.

No gate that reads a page as prose reaches a rows file.

A rows file goes when its page goes.

A row is read as a page wherever a page is read.

