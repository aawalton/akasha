---
id: b25d8283-24ed-5c9d-bf84-a34ec48f19c4
page-type-slug: old-ops-command
title: "Ops eso generate typings"
slug: ops-eso-generate-typings
domain-parent-slug: domain/ops-eso
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/eso/generate-typings.ts
path: eso generate-typings
irreversible: false
---

# Definition

- **Ops eso generate typings** — akasha's ESO API declaration files, rebuilt from the ESO UI documentation dump.

# Design

The opt-in manifest naming which tokens are kept stands beside this command rather than in the code repository.

An emitted file carries a header naming this invocation and the API version it was built from.

The emitted files are formatted with the code repository's own Biome rather than this repository's.

# Help

Parse the ESO UI documentation dump for every function, object, event and enum it describes,
keep the ones the opt-in manifest names plus the enums and parent objects those reach, and
write the result into akasha as the declaration files its addons compile against.

The manifest is the scope. The dump describes thousands of tokens and an addon needs a few
hundred, so the manifest stands here beside the generator and a token absent from it is absent
from the typings.

The written files are tracked artefacts of akasha; this command is the rule they
are made by and stands here, where no deploy has to carry it. The output tree is taken from the
checkout named, akasha by default, rather than from this file's own location.

The emitted files are formatted with the written checkout's own Biome, so a run leaves the tree
as a run from inside it would have.
