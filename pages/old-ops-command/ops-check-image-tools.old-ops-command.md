---
id: 75cfb3f8-aad7-50e0-80c9-a0ae842c272b
page-type-slug: old-ops-command
title: "Ops check-image-tools"
slug: ops-check-image-tools
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-image-tools.ts
path: check-image-tools
---

# Definition

- **Ops check-image-tools** — ruling that every binary a CI step runs is one the image that step runs on carries.

# Help

Rule that every binary a composed CI step runs is one its target image carries.

Composes every `workflow-template` page over the tree it is given — akasha, or whatever checkout `CODE_ROOT` names — resolves each step's commands, parses the shell for the binary each segment invokes, and compares it against the tool list `IMAGE_TOOLS` gives that step's image. A step reaching for a binary its image does not carry fails at run time with `command not found`, after the pod has been scheduled and the checkout paid for.

The image names and the tool lists are read from the same module the workflows compose against — `tools/lib/workflow-dsl/images.ts` in akasha — so the string being judged and the table judging it cannot drift apart. A tool table kept in some other checkout would compare an image string minted here against a list maintained there.
