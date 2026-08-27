---
id: feee8841-c5dd-5eae-96bf-549b7dc74306
slug: coherence-rule-guards-an-undeclared-key
page-type-slug: finding
title: "Coherence rule guards an undeclared key"
domain-slug: domain/pages-system
---

# Claim

The `persona` page-type guards a coherence rule on `domain`, an attribute key it does not declare, so `ops page-type property-defs --slug persona` reports a clean, believable absence for a property that is live and populated on every persona row. A reader taking the materialized blob as the persona schema gets a false picture of it, and the rule's own guard depends on a key the blob would say is not there.

# Evidence

Read 2026-08-08 against the live database through `ops`.

`ops page-type property-defs --slug persona` returns 76 lines. Captured and searched with `grep -n "^domain"`, it exits 1. `role` stands at line 52, so the omission is specific rather than a truncation.

The key is live on the rows. `ops page list --type persona --all --properties slug,domain,role` returns 42 rows carrying domain slugs (`athena agent-harness lead`, `ione sleep coach`), and `ops page show 019f2330-25c9-770c-894f-fd4ac497997c --properties domain` returns `agent-harness`.

The page-type's own rules key on it. `ops page show 019eb7f9-08cd-722e-8e5e-7c6928dc578d --properties coherenceRules` returns seven entries, the last `{"kind":"requires","when":{"eq":"sleep","key":"domain"},"require":[["sleepMinuteWords"],["sleepDayTurnWords"]]}`. Both required keys ARE declared; the key it fires on is not.

The one `domain` property-definition row belongs elsewhere. `ops page list --type property-definition --all --properties stringId,name,pageType --search domain` returns a single row whose `pageType` is `019db533-f381-73ff-a032-c4a06aa493e2`, the `agent` page-type. Persona does not extend it — its `extendsPageTypeId` is `019db533-f381-738c-ba1f-8088bf231d28`.

Nothing fails today. `pages/finding/pages-system/half-declared-relation-stops-writes.finding.md` records, lead-verified, that undeclared DATA is tolerated and only a half-declared RELATION breaks writes.

What this adds. `pages/finding/pages-system/undeclared-audit-skips-soft-deleted.finding.md` covers the audit's `deleted_at` gap and reports its live-row control at 0; that control excludes any key that is some definition's `stringId` anywhere, and `domain` is one on `agent`, so this passes through it. I opened both rather than judging by name, after running `rg -il "undeclared|no property definition|propertyDefinitions"` over `findings/`.

Not verified: whether it was ever declared here, whether `rematerialize` restores it, or whether other page types do the same.
