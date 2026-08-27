---
id: 5263cc98-e993-55a8-9f7f-2c2bceb20501
slug: file-never-read
page-type-slug: refusal
title: "File never read"
holes:
  - path
  - route
---

# Refusal

You have not read `{path}`, so this change may be landing on top of work someone else did.

`{route}` prints it whole and records the read. Only that and the `Read` tool record one — a shell read with `cat`, `head` or `sed -n` records nothing, so a file read that way still stands here as unread. Then make the change against what it actually says.
