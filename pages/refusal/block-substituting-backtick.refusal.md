---
id: ce636447-6175-5c9a-be02-81c079da1e65
slug: block-substituting-backtick
page-type-slug: refusal
title: "Block substituting backtick"
holes:
  - index
  - where
  - excerpt
---

# Refusal

Refused: a backtick standing where bash would substitute it.

  at character {index}, {where}:
{excerpt}

Bash runs the span between backticks BEFORE this command's process exists, so what
arrives is that span's output and never the characters you wrote. Nothing downstream
can tell — by then the text is already gone.
  Meant to substitute?  Use $( ) — same job, POSIX, and it nests where a backtick does not.
  Meant literal text?   Single-quote the value, or write it to a file with a quoted
                        heredoc (<<'EOF') and pass the path.

Permitted unchanged, because bash leaves all three literal: a backslash-escaped
backtick, a single-quoted value, and a heredoc whose delimiter is quoted.
Run this hook with --scope for what it does not cover.
