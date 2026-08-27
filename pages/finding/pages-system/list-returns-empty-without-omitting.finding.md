---
id: 24d3c87d-f622-5818-bce1-55c2ef7caec0
slug: list-returns-empty-without-omitting
page-type-slug: finding
title: "List returns empty without omitting"
domain-slug: domain/pages-system
---

# Claim

`ops page list --properties` returns a property as empty while NOT naming it in the row's `omitted` list, so a caller reading it gets a zero that is indistinguishable from the property being genuinely empty. `ops page show` on the same page and property returns the content.

# Evidence

Hit first-hand on 2026-08-16 while measuring `gmReference` across the eight live game pages, not by looking for it.

`ops page list --type game --all --properties title,externalId,gmReference --json` returned all eight rows with `gmReference` reading empty. Each row carries `omitted`, and on those rows it held seventeen names — `createdAt`, `slug`, `states`, `turns` and so on — but NOT `gmReference`. So the payload asserted the key was present and gave nothing for it.

`ops page show 019f49aa-24b0-7482-b98e-a45de9d3eb6f --properties gmReference` on one of those same pages returned a fully populated `{"sections":[...]}` document beginning with a Region and five Locales. Measured through `show` one page at a time, seven of the eight carry sections, one of them 51.

Had I trusted the first reading I would have reported that every game's designed truth had vanished, which is the opposite of what stands.

This is the failure `Named Key` on `page-types/role.md` names — a zero looks the same whether nothing is there, nothing matched, or the key was read wrongly. The `omitted` list is the mechanism that should part those cases and it did not, which is worse than having no such list: a caller who checks `omitted` and finds their key absent has been told the reading is good.

NOT ESTABLISHED: which properties this affects, or on what rule. Only `gmReference` on the `game` type was read. Whether it turns on size, on type, or on something else is unmeasured, and so is whether `omitted` is wrong or the value fetch is.
