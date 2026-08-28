---
id: b7717267-4b5a-56e9-83f1-cb794e140822
slug: finding-misfiled
page-type-slug: refusal
title: "Finding misfiled"
holes:
  - path
  - owner
  - folder
  - leaf
  - store
---

# Refusal

{path} declares `domain-slug: {owner}` and does not sit under that domain's folder. The key is the authority, and the folder it names is the slug half of it, so this belongs at `{store}/{folder}/{leaf}`. `ops finding rehome` moves it there and repoints whatever cited the old path; a hand-rolled `mv` strands those citations.
