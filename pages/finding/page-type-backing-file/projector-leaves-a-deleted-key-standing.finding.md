---
id: 1ba3a348-9928-5811-b96e-7809dd004c51
slug: projector-leaves-a-deleted-key-standing
page-type-slug: finding
title: "The pages-mirror projector reconciles no deletions, so a key removed from a file stays standing on its row"
domain-slug: domain/page-storage
---

# Claim

`ops pages-mirror project` writes what a file declares and reconciles no deletions, so a key removed from a file's frontmatter stays standing on that file's row.

# Evidence

Recorded by #19403, which built the projector, and carried here because that project's document is taken away at its close.

No drift stands today. Comparing all eleven `readout-scale` files against their rows on 2026-08-18 — by the id in each file's own frontmatter, over the store's public endpoint — found 45 declared values agreeing and no key on any row that its file does not declare. The comparator was first run against every `red-at` shifted by one and reported all eleven, so a blind pass would have shown.

What the projector cannot do is unwrite. A threshold deleted from a file leaves its row carrying the old number, which reads exactly like a threshold deliberately declared, and a scale is precisely a thing a reader colours by. Nothing depends on that yet only because no scale has lost a key since the rows were written.
