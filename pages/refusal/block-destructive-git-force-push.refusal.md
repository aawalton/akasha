---
id: 9b15909a-3e00-5083-bfa2-83dcbc0619ad
slug: block-destructive-git-force-push
page-type-slug: refusal
title: "Block destructive git force push"
---

# Refusal

git push --force (any variant) is prohibited - rewrites shared remote history.

Safe alternatives:
  - To change what the remote holds: land a further commit and push it; shared history is not rewritten here
