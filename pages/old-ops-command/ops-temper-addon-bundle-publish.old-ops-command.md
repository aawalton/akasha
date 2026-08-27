---
id: 1bc36680-c5b4-54c0-9a83-238a26d6bdae
page-type-slug: old-ops-command
title: "Ops temper addon bundle publish"
slug: ops-temper-addon-bundle-publish
domain-parent-slug: domain/ops-temper-addon-bundle
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/bundle/publish.ts
path: temper addon bundle publish
irreversible: false
---

# Definition

- **Ops temper addon bundle publish** — the addon bundle built here and pushed to the cluster registry under the hash of its own bytes.

# Design

What it pushes is named by the hash of the zip rather than by the commit it was built from, so a commit changing nothing about the addons publishes nothing new.

The name it pushes to and the name the cluster pulls from are two names for one registry.

It writes the tag into akasha only after the push, so what the tag names is already there.

# Help

Build the Temper addon bundle on this workstation and publish it as an OCI image.

The compiler this build needs stands only on this workstation, so this cannot run in
the cluster. The bundle is built here, tagged by the sha256 of the zip itself, pushed
to the cluster registry, and the tag written into akasha where the web
deployment reads it.

Every addon is compiled first, through `ops temper addon build --all --build-only`, and
the bundle script then packs what stands in `dist/`. It builds nothing itself and refuses
a `dist/` missing any addon it would pack, so an incomplete archive cannot be published.

The bundle build writes the zip and a version file beside it. The zip is built
with a fixed entry mtime, so identical addon sources give identical bytes and the same
content hash. That hash replaces whatever version the build wrote, so the version the
build is handed is a placeholder and never reaches the image.

The push target and the pull target are different names for one registry: this
workstation reaches it on a node port, the kubelet reaches it on its cluster DNS name.
