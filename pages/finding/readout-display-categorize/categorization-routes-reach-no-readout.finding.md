---
id: 22bd198b-f914-5b62-b9f9-33d02a3cc978
slug: categorization-routes-reach-no-readout
page-type-slug: finding
title: "Categorization routes reach no readout"
domain-slug: readout-widget/alanwalton-categorize
---

# Claim

Both `api.categorization.ts` files reach no readout document. The glob that used to bind them has gone from `readout-group-categorization`, and `readout-display-categorize` states no route of its own to replace it.

# Evidence

Measured on 2026-08-23, on commit `9fdfdefa1`.

`pages/readout-group/readout-group-categorization.md` carried `packages/*/web/app/routes/api.categorization.ts` until the wildcard sweep took it. That glob was the only thing naming those files, because `pages/readout-display/readout-display-categorize.md` names a widget and no route.

`bun tools/required-reading.ts` against `packages/alanwalton/web/app/routes/api.categorization.ts` and `packages/smilingjenny/web/app/routes/api.categorization.ts` returns `browser.md`, `code-comment.md`, `file-kind-ts.md`, `code-repo.md` and the web app page for each — no readout document among them. Both files stand on disk.

The other readouts kept their routes because the display named them literally and the conversion to `route-path` carried them over. This one had nothing to carry.

What it would take is a `route-path` on `readout-display-categorize` naming both files. That is not written here because `list(file)` resolves to nothing today, so writing it would record the claim without restoring the reading.
