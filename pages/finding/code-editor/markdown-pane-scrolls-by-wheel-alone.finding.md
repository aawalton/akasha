---
id: 1a09dfab-a282-574e-b877-2b8a707f0ece
slug: markdown-pane-scrolls-by-wheel-alone
page-type-slug: finding
title: "Markdown pane scrolls by wheel alone"
domain-slug: domain/code-editor
---

# Claim

The markdown pane in Alan's cut of VS Code scrolls by mouse wheel alone: no keyboard scrolling, no scrollbar, no reading position that survives being left.

# Evidence

#17748 landed native markdown rendering in the cut, replacing the `markdown-language-features` extension that #17543 deleted. All three criteria were met and lead-verified: a file from Alan's own monorepo rendered on a plain click with no webview, `classify-extensions --verify` reported declarative=61 activating=0, and `tools/gate.sh` passed 8/8 with the markdown criterion proven red before green from the tree.

The delivering seat recorded the scroll behaviour as a known gap rather than a criterion failure, and it is not one — no objective on the row asked for it. It is filed here because the row closed on 2026-08-05 without the gap being taken up anywhere, and because nearly everything Alan reads in this estate is markdown, so the pane's whole job for him is this one.

What it means in use, unmeasured and worth measuring before anything is built: a document longer than a screen has no keyboard path through it, so reading a long instructions surface or a row document means holding a hand on the wheel. Two related absences ride with it and neither has been established — whether the pane restores a reading position when a file is reopened, and whether it can be searched.

The typography judgment the row was parked on is also unmade. Alan closed the row rather than making it, so nothing records whether the rendering reads well, only that it renders. That judgment is his alone and no instrument substitutes for it.
