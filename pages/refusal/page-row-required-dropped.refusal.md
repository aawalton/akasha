---
id: e813289f-8ce1-5488-9673-25abe9c6241f
slug: page-row-required-dropped
page-type-slug: refusal
title: "Page row required dropped"
holes:
  - key
  - on
---

# Refusal

`{key}` is required on `{on}` and this row already carries it, so this write would take it away — a `write-row` lands the whole row and drops every key it does not name. State `{key}` again to keep it, or use `patch-row`, which keeps what it does not name.
