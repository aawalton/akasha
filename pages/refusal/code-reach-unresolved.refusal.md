---
id: a24849da-ae44-52b0-a54f-cbc9c092c50f
page-type-slug: refusal
title: "Code reach unresolved"
holes:
  - path
  - named
  - root
---

# Refusal

`{path}` hands `{named}` to a code-repository loader, which resolves it against `{root}` and looks nowhere else.

A copy of it standing in this repository does not answer for it, because `code-import.ts` joins the reference to that one root. Either the file moved and this reference has to follow it, or the reference was never right — whichever it is, whatever hands it over fails only when somebody runs it.
