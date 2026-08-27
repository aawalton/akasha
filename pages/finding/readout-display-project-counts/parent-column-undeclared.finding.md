---
id: 81ec8db6-4c86-51ea-8287-d8eb325cf459
page-type-slug: finding
title: "A parentless project counts on the parent column and no line says so, so tidying the fold would undo it"
domain-slug: domain/global
---

# Claim

A project with no parent counts on the parent column of the status bar, and no line on `readout-display-project-counts` says so, so a reader tidying the fold would undo it.

# Evidence

#19387 landed this behaviour deliberately and it is live on `origin/main`: the route folds through `trackOfLineageRows`, where a row with no `parent-seq` lands on the parent column rather than a singleton column of its own. The delivering seat flagged it as wanting a Design line and left it, correctly, since a domain's Design is Alan's to agree.

The seat also found that the track rule the row itself stated could not work: no project file carries a `children:` key at any depth of history, so that rule would read every standing parent as a singleton and drop a parent at `awaiting_manager_seat` out of yellow. The parent set is derived from the standing rows' own `parent-seq` instead. That is a second departure a reader would not guess.

Verifying #19387 on 2026-08-18 I passed the work and left both unwritten, this being a definition rather than a delivery. The project's document is deleted when it closes, so this is the copy that survives it.
