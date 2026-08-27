---
id: 88fff432-c415-5737-b8ce-19dd6609bc45
page-type-slug: finding
title: "Token values in default projection"
domain-slug: domain/pages-system
---

# Claim

`ops page show` prints a `claude-account` row's `access_token` and `refresh_token` in full in its default projection, so a seat that runs it for any other reason lands live Anthropic OAuth credentials in its transcript. The rule that replaces a value with a placeholder keys on the property's TYPE and storage tier, never on whether it is sensitive, and both tokens are plain `text`.

# Evidence

The rule is stated in the verb's own help at `packages/shared/pages/cli/src/page/show.ts:24`: "When --properties is omitted, verbose fields (markdown / json types) and content-tier fields (storage=content) that hold data are replaced with a placeholder string `<omitted: load via --properties=<key> if needed>`". Sensitivity is not among the criteria.

`ops property-definition list --page-type claude-account` returns fifty rows, among them `access_token` and `refresh_token`, both typed `text` and both — alone among the fifty — carrying an empty display name. Being `text` rather than `json`, neither qualifies for the placeholder.

Observed: `ops page show` on the `aawalton` row printed forty-odd properties, with `scopes` and `mcpOAuth` correctly replaced by the placeholder and the two token values printed whole, each a full `sk-ant-` bearer string. They sit between `account` and `lastViewedAt` in the same undifferentiated key-value list as the pacing numbers.

The gap is between what the omission mechanism is tuned for and what it is read as covering: it exists to keep bulky values out of a listing, and a reader meeting it on `scopes` reasonably infers that anything worth hiding is hidden.
