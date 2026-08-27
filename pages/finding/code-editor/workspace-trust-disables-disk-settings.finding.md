---
id: d9555fc8-6513-521c-8683-db1df1673633
page-type-slug: finding
title: "Workspace trust disables disk settings"
domain-slug: domain/code-editor
---

# Claim

Workspace trust is the single browser-held state that silently disables every setting held on disk, and nothing in the editor says so.

# Evidence

The editor's settings now live on disk in `~/walton.code-workspace`: thirteen window-scoped settings plus `workbench.colorTheme`. Measured 2026-08-09 on a Playwright profile holding no storage at all, they apply — theme `dark_modern`, background `rgb(37,37,38)`, command centre absent.

They apply ONLY once the workspace is trusted. On that same profile before trust was granted, the workbench opened in Restricted Mode and ignored the file entirely: theme `light_modern`, background `rgb(243,243,243)`, command centre present, status bar reading `Restricted Mode`. Granting trust alone did not change it; trust plus a reload did, and every reading inverted.

The trust grant is browser state, keyed to the origin, exactly as the settings store used to be. So the exposure this editor was understood to have — settings lost with the browser store — has not gone away, it has moved: what a cleared store now costs is the trust grant, and losing it does not present as losing settings. It presents as the editor ignoring a settings file that is still sitting on disk, correct and complete.

That failure mode is worse than the one it replaced, because the evidence points away from the cause. It cost two wrong readings during the verification of #18177, both reported before the confound was found.

Site data was cleared on this machine on 2026-08-09 while chasing the origin fault recorded in `1edd34f`, so this is not hypothetical.
