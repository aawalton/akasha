---
id: 2ecfa674-a52f-5ee8-9bf2-8a25944ea62f
page-type-slug: refusal
title: "Block playwright stray filename"
holes:
  - filename
  - dir
  - base
---

# Refusal

Refusing playwright MCP call: filename='{filename}' is not under {dir}/.

The --output-dir flag only governs auto-generated filenames. An explicit `filename` argument is taken literally — a relative path lands in the MCP process cwd (the read-only main checkout or a worktree), not in --output-dir.

Either:
  - Omit `filename` to use the auto-generated default under {dir}/, or
  - Pass an absolute path under {dir}/ (e.g., '{dir}/{base}').
