---
id: 01a03505-e56c-7000-8c27-c29a7edb9693
page-type-slug: old-ops-command
title: "Ops temper addon global name dependents"
slug: ops-temper-addon-global-name-dependents
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/global-name-dependents.ts
path: temper addon global-name-dependents
---

# Definition

- **Ops temper addon global name dependents** — every site depending on an addon global name, and whether renaming it is safe.

# Design

A registration name a template or a concatenation builds is reported as no dependent rather than as a guess.

A scan given no name reports only a global carrying a settings-panel registration.

# Help

List every site that already depends on an addon global name, and rule the name rename-safe or keep-name-required.

Three kinds of dependent are found: a TypeScript read of `globalThis.<name>` or `_G["<name>"]`, an XML handler or keybind naming the global, and a LibAddonMenu registration binding the settings-panel topology to the name. A registration name built by concatenation or a template is outside the deterministic envelope and is not resolved, so it is reported as no dependent rather than as a guess.

Given no name, every global an addon writes or claims through `addon.json#savedVariables` is scanned, and only those with a registration binding are reported.

The addon source files and the ownership scan are read from the checkout scanned, which is akasha unless another is named.
