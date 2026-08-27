---
id: aaab5ec8-6fe8-5dcf-8ad2-933ec3dca297
page-type-slug: refusal
title: "Block destructive git branch delete"
holes:
  - invocation
---

# Refusal

git {invocation} is prohibited - destroys branch state other agents may rely on.

Safe alternatives:
  - A branch whose commits have landed: git branch -d <name> is permitted and takes it
  - A branch whose commits have not landed: land them first, or get Alan's ruling to discard the branch
