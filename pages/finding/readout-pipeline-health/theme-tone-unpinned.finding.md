---
id: a1b19f45-2dd2-5b1e-836c-b16b1bd1ffbb
page-type-slug: finding
title: "Theme tone unpinned"
domain-slug: domain/global
---

# Claim

Nothing holds the pipeline-health tile's neutral tone against the editor theme it was copied from, so a theme change makes the two surfaces disagree with no instrument reporting it.

# Evidence

The tile cannot read a theme, so #18245 gave it a literal: `NEUTRAL_INFLIGHT` at rgb(140, 140, 140), mirrored against `STATUS_BAR_NEUTRAL_HEX` in `@shared/project-status` by a third dimension added to `check-widget-bucket-color-mirror`.

That mirror pins the tile to the constant. Nothing pins the constant to the theme. The value comes from `workbench.colorTheme: Dark 2026` in `walton.code-workspace`, which resolves to VSCode's own `extensions/theme-defaults/themes/2026-dark.json` in the code-editor tree, whose `statusBar.foreground` is `#8C8C8C`. That file is upstream's, sits outside the code repository, and is reachable from no check that runs there.

The status bar itself holds no literal — it renders the tone by declining to set a colour, which is what keeps it correct when the theme moves. So the tile is the only surface carrying the value, and a theme change moves the bar and leaves the tile where it was. Both surfaces keep rendering, each internally consistent, and the mirror stays green throughout.

Verified by hand on 2026-08-09: `Dark 2026` is the registered label for that theme file, its `statusBar.foreground` is `#8C8C8C`, no `workbench.colorCustomizations` overrides it in the workspace file, and the tile's channels equal it. The link agrees today, which is the whole of what is known about it.

The same shape reaches every other tile that ever copies a theme colour, so it is not particular to this one cell.
