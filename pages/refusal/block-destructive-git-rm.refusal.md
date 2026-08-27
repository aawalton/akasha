---
id: e0b568ed-124e-5aec-ba0f-69d32467480d
slug: block-destructive-git-rm
page-type-slug: refusal
title: "Block destructive git rm"
---

# Refusal

git rm is prohibited - destructively removes tracked files. Use plain rm + git add (Edit-with-stale-check is safer for content-level changes).

Safe alternatives:
  - To stage a deletion: rm <path> then git add <path>
