---
id: a1684da7-9886-5549-8bd6-1e9378a43a88
page-type-slug: finding
title: "Editor css names an extension container ID"
domain-slug: domain/code-editor
---

# Claim

The editor's stylesheet now names an extension's view container id directly, because an extension cannot style its own view badge. Renaming or re-registering that container leaves the rule matching nothing, and the styling silently reverts with nothing reporting the break.

# Evidence

Alan asked for the Agents panel's count to read as coloured text rather than a filled pill, for that panel alone. The badge is drawn by the editor from a `view.badge` an extension sets, and nothing in the extension API styles it — so the change landed in `paneCompositePart.css` in `~/code-editor` as a rule selecting `[data-composite-id="workbench.view.extension.opsAgents"]`, with a `data-composite-id` attribute added in `compositeBarActions.ts` to make a single composite addressable at all.

The id in that selector is owned elsewhere: the extension in `~/code` contributes `opsAgents` under `viewsContainers.secondarySidebar`, and the views extension point prefixes it to `workbench.view.extension.opsAgents`. Two repositories, no shared constant, and no check comparing them.

The failure is silent in both directions and was demonstrated in the small during this work: a selector written against the bare `opsAgents` matches nothing, draws the ordinary pill, and reads as a clean successful change. That same shape is what a future rename produces.

There is precedent for the rename happening. This very panel's container id moved from `opsSeats` to `opsAgents` under project #18382, days before the styling rule was written against the new spelling.

NOT MEASURED: whether any existing check in either repository would catch the mismatch — none was found, but no exhaustive search of the check registry was made. Nor whether other editor-side rules already name extension-contributed ids, which would make this an instance of a wider pattern rather than the first of its kind.
