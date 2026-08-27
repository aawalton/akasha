---
id: 4cab17f5-57a6-5973-be34-2cab3a7a6241
slug: select-option-write-reports-success-and-saves-nothing
page-type-slug: finding
title: "Adding a select option reports success and writes nothing"
domain-slug: domain/pages-system
---

# Claim

The web route that adds an option to a select property reads the property definition from a file, writes the new option to a database row that no longer exists, discards the result, and answers the browser `ok: true, created: true`. The option is not saved anywhere. Nothing reports it.

# Evidence

`packages/alanwalton/web/app/routes/api.property-option.ts:1` imports `getPage` and `patchPropertyDefinitionById` from the same module. The two now reach different stores: `getPage` is file-backed, and `patchPropertyDefinitionById` calls the `property_definition_patch_by_id` routine against `public.pages`.

The route reads the existing config, composes `newConfig` with the added option, then at `:80`:

```
await patchPropertyDefinitionById(sb, { id: definitionId, set: { config: newConfig } })
return Response.json({ ok: true, option: decision.option, created: true }, { headers })
```

The return value is discarded. `property-definition.ts:47` shows the wrapper answers `null` rather than raising when the row is absent — it raises only on a database error, and a patch matching no row is not an error.

There are zero `page-property-definition` rows and zero live rows of any kind in `public.pages`, measured with a control: a bogus slug answers 0 and an unfiltered count answers 8,469, all of them soft-deleted.

So every branch lines up to report success. The read succeeds because it comes from a file. The write matches nothing because the table is empty. The `null` is discarded. The browser is told the option was created, and the interface shows it.

Three other callers share the same wrapper and want checking against the same question: `packages/shared/pages/cli/src/lib/ensure-select-options-valid.ts:56`, `packages/shared/pages/ui/src/components/use-page-default-content.ts:43`, and `use-view-row-handlers.ts:42`.

Found while establishing whether `property_definition_patch_by_id` could be dropped with the table. It was deliberately kept back on the grounds that it still had live callers, which is true — and the callers were already writing into an empty table before anything was dropped.
