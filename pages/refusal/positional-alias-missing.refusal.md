---
id: 761b849a-0046-5cb1-8e6c-648f6f8771f8
page-type-slug: refusal
title: "Positional alias missing"
holes:
  - command
  - identifiers
  - first
---

# Refusal

`ops {command}` requires {identifiers} and accepts no positional aliasing any of them, so `ops {command} <value>` is refused where the same value is accepted positionally by every other command naming that flag. The vocabulary is not a list anybody keeps: a flag name is an identifier here because some command in this surface already declares a positional aliasing it, which is this tree's own act of saying the two forms are equivalent for that name.

Add a positional to the command's help: `{ name: "<subject>", required: false, aliasOfFlag: "{first}" }`. Aliasing some other flag is worse than aliasing none, because the value a caller types would then bind somewhere they did not name.
