---
id: d8880140-410a-5323-ad33-31160859b65b
slug: mined-items-by-id
page-type-slug: page-query
title: "Mined items by id"
page-type: temper-mined-item
takes:
  ids: list(text)
where:
  slug:
    in:
      - $ids
limit: 50
---
