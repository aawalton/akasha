---
id: 8bfde790-8f51-560c-b639-d8c1c64d85f6
page-type-slug: refusal
title: "Category rule match unreadable"
holes:
  - rule
  - count
---

# Refusal
{rule} holds {count} line(s) under `# Match` that cannot be read as a condition or a value.

A match is a set of conditions all of which must hold, so a match holding none matches everything — which means a line silently dropped does not narrow a rule, it widens one. A reader that passed over what it could not parse would turn a narrow rule into a terminal one and report nothing.

A condition is `- **field** comparison` with its accepted values as `` `code` `` children beneath it.
