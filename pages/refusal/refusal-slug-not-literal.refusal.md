---
id: 1269371d-efca-5575-9872-c0a588a34b0c
page-type-slug: refusal
title: "Refusal slug not literal"
holes:
  - path
---

# Refusal

`{path}` calls `refusalText(` with something other than a double-quoted slug as its first argument, so which document it prints cannot be read out of the text — and a pairing this cannot find is one it reports nothing about.
