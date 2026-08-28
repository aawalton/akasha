---
id: 78d78815-a253-51e4-a0d8-52a8cc18af25
slug: addon-licences-unshipped
page-type-slug: finding
title: "Addon licences unshipped"
domain-slug: domain/temper
---

# Claim

The temper add-on download archive publicly redistributes six third-party ESO libraries with no licence text shipped for any of them, and the licence of five of the six has never been determined upstream.

# Evidence

Filed by #16016's implementer (2026-07-25T11:51:24.950Z) from work that landed and deployed live (commit c4f07c9, main pipeline 25771). Before #16016 the six libraries existed only inside the repo, installed onto Alan's machine via the agent-only deploy path. As of this deploy, https://tempereso.com/api/addons/download serves them to any anonymous visitor — verified http=200, application/zip, 1,086,589 bytes, no cookies: internal use became public redistribution.

The six, resolved via listAllAddons() (the bundler's own resolver), all under packages/temper/shared/addon-libraries/: LibAddonMenu-2.0 (lib-addon-menu), LibAsync (lib-async), LibCustomMenu (lib-custom-menu), LibDebugLogger (lib-debug-logger), LibHistoire (lib-histoire), LibTableFunctions-1.0 (lib-table-functions).

Measured: none of the six source dirs holds a LICENSE/COPYING/NOTICE file (control check found one at packages/temper/shared/build-deploy/tstl/LICENSE). The archive ships no licence text for any of them. ember previously determined LibAddonMenu-2.0 is Artistic 2.0; the other five are undetermined — resolving needs each upstream (ESOUI), not the repo.

Filer's own instrument failures, why the row says "open" not a number: resolved dirs by kebab-cased folder name so lookups returned empty and a follow-up grep on an empty path printed a false zero for all five; grepped addon.json for canonical names, matching dependents and resolving three to the wrong addon; case-insensitive keyword counts returned 5-25 noise hits, not reported.

Why it matters: ember blocked TamrielTradeCentre from the bundle on its ToS; this question was never asked of these six.

Suggested, not decided: determine each licence upstream, ship licence text per addon folder, add a build check failing the bundle when a shipped addon has no recorded licence.

Verdict 2026-07-25T12:57:09.360Z: parked at verification_automated for ember to close. Project #16094, status someday_maybe, live-on: deploy, domain temper.
