---
id: 019ffe9a-4c21-7000-9f3e-2b7a51d0c4e6
slug: suite-batch-killed
page-type-slug: refusal
title: "Suite batch killed"
holes:
  - batches
  - files
---

# Refusal

{batches} batch(es) of `bun test` were killed for running past the deadline, taking {files} file(s) with them. A killed batch prints no summary, so nothing is known about those {files}: they are neither passing nor failing, and none of the counts above include them. A batch that runs long enough to be killed spends the whole remaining budget, so the files after it are never started either.
