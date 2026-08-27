---
id: 8f0fd091-131b-5e8a-b5bc-50b653b848ad
page-type-slug: finding
title: "The project query service feeds a readout while standing under no readout source"
domain-slug: domain/readout-system
---

# Claim

`project-query-service.ts` now feeds a readout and stands under no readout source, so the status bar's project counts have a feed that nothing in the corpus names.

# Evidence

#19387 moved the status bar's project counts off `get_status_bar_snapshot` onto the page query service, landed on `origin/main`. Verifying it on 2026-08-18 I confirmed the route reads `/q/projects-with-lineage` and `/finished` through `@shared/status-bar-access` rather than the SQL.

Every other feed a readout draws from is named by a document under `domains/readout-sources/`. This one is not, so the readout that Alan reads has a source no reader of the corpus can find. Minting that document is a Definition line and therefore Alan's to agree, which is why the delivering seat left it and why I did not write it either.
