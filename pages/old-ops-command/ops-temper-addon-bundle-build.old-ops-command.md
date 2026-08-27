---
id: 01a03535-be18-7002-8634-f415fa16ee84
page-type-slug: old-ops-command
title: "Ops temper addon bundle build"
slug: ops-temper-addon-bundle-build
domain-parent-slug: domain/ops-temper-addon-bundle
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/bundle/build.ts
path: temper addon bundle build
irreversible: false
---

# Definition

- **Ops temper addon bundle build** — every distributable addon's built folder, packed into the archive the bundle image carries.

# Design

Nothing is compiled here; an addon with nothing built is refused rather than left out of the archive.

Entry timestamps are fixed, so two runs over one build produce the same bytes.

The archive is a build intermediate on this workstation; what leaves is the image built from it.

# Help

Pack what already stands in a code checkout's `temper/addons/dist/` into `temper-addons.zip`, beside a `version.txt` naming the commit it was built at. Nothing is compiled here: an addon with nothing in `dist/` is refused rather than silently left out of the archive players download.

Every addon on the roster is packed, whether or not anything depends on it, along with each sibling folder a manifest declares. A dependency naming something the roster does not hold is an addon the player installs themselves, and is reported rather than packed.

Entry timestamps are fixed, so two runs over the same `dist/` produce the same bytes and the image built from them keeps its content hash.

The archive is a build intermediate on this workstation. What leaves it is the image `ops temper addon bundle publish` builds from the archive, and this stands here because nothing carries the packer itself.
