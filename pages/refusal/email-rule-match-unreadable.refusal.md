---
id: eded3468-7ada-5940-9210-243bae825c0a
page-type-slug: refusal
title: "Email rule match unreadable"
holes:
  - rule
  - count
---

# Refusal

{count} line(s) under `# Match` in {rule} are not a condition or a value this reader understands. One unreadable rule stops its whole folder being decided, so no rule there was examined — not just this one.

A condition is a field and a comparison — `- **from** ends with` — with its accepted values as code-marked children beneath it. Nothing was assumed about the lines that could not be read: conditions all have to hold, so dropping one quietly widens the rule rather than narrowing it, and a match left holding none matches everything.

If the body looks right, check its field and its comparison against what `tools/lib/email-rule-set.ts` declares. The reader's vocabulary is built from that declaration on every run, so a spelling it rejects is one the declaration does not carry.
