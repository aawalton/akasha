---
page-type-slug: finding
id: eec992f5-cfc3-564f-a313-ff4f3463d0f4
slug: workflow-name-key-absent
title: "Workflow name key absent"
domain-slug: domain/code-quality
---

# Claim

`prev-sha-lookup.ts` filters `workflow` pages on a key no `workflow` page carries, so the lookup it exists to perform answers nothing and has answered nothing for as long as the key has been wrong.

# Evidence

Measured 2026-08-21, while redirecting page callers onto the page query service.

`packages/infra/scripts/src/docs-validator/prev-sha-lookup.ts:11` builds its query as `{ key: "workflowName", eq: workflowName }` against `pageTypeSlug: "workflow"`.

Asked the live page query service at `http://127.0.0.1:8787` for `workflow` rows and collected every key present across them. It answered `n = 26` with this key set: `always-runs`, `body`, `changed-files`, `depends-on`, `failed-dependency`, `failed-steps`, `id`, `inputs-hash`, `kind`, `name`, `owner`, `page-type-slug`, `pipeline-seq`, `seq`, `status`, `when-branch`.

No row carries `workflowName`, and none carries `workflow-name`. The field holding what the code wants is `name`.

A missing key is legal rather than an error, so the filter returns an empty match instead of failing. Nothing downstream distinguishes "no prior sha exists" from "the question was unanswerable", which is why this can stand while the script keeps reporting success.

Not measured: when the key diverged, whether it was ever `workflowName`, or what the docs-validator does differently on an empty answer versus a populated one. The 26 rows are what stands today; older rows already rotated out were not examined. No other query in `docs-validator/` was checked for the same fault.
