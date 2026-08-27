---
id: 01a040b5-d5e9-7000-8f7a-ffb0e819fcf9
page-type-slug: mp-command
title: "Move"
slug: move
path: package move
domain-parent-slug: domain/ops-package
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Move** — a workspace package carried to the place its name states, manifests and tsconfigs following.

# Design

A package is named by the directory holding its manifest, and every tracked file beneath it goes with it.

A package lands where its own name says: the scope becomes the folder and the rest the name.

A tsconfig path reaching a package staying behind is refused by name rather than guessed at.

Where a package has already moved, only the plan says where it went.
