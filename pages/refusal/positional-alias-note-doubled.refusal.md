---
id: 574f3edb-2ce4-5794-b145-3c279f8be5a5
slug: positional-alias-note-doubled
page-type-slug: refusal
title: "Positional alias note doubled"
holes:
  - command
  - positional
---

# Refusal

`ops {command}`'s positional `{positional}` says "alias of" in its own description, and the help renderer appends that note itself, so the rendered line carries it twice. Drop it from the description and let the renderer say it.
