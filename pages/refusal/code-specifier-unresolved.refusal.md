---
id: dee6a246-773e-51f9-a516-309067742367
page-type-slug: refusal
title: "Code specifier unresolved"
holes:
  - path
  - specifier
  - root
---

# Refusal

`{path}` names `{specifier}`, which resolves to nothing from `{root}`.

It is read as a package specifier through that package's own `exports` map, never as a file path, so either no package of that name stands there or it exports no such subpath. Whatever hands it to `codeModule` fails only when somebody runs it.
