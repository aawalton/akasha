---
id: b0133b7a-901a-57b4-a351-8b1a11901e77
page-type-slug: refusal
title: "Block destructive git amend"
---

# Refusal

git commit --amend is prohibited - rewrites HEAD that other agents have committed on top of.

Safe alternatives:
  - To correct what a commit did: land a further commit with ops write or ops edit
