---
id: 45b5f4de-07c0-5e51-8536-6248755570eb
page-type-slug: finding
title: "Sidecar readers collapse absent and unreadable into one empty answer"
domain-slug: domain/pages-system
---

# Claim

Sidecar readers collapse absent and unreadable into one empty answer. `personaAttachment` returns undefined for a missing file, a wrong root and a non-`md` extension alike; `readUncommitted` returns null on malformed YAML; `rowsFilesFor` returns an empty list on a failed readdir and callers fall back to the base path, dropping parts; `pagesOfRowsFile` returns zero pages and zero faults for an unstattable file. A fault presents as a property with no value.

# Evidence

A delegate located and quoted each catch block; I confirmed the shape of `personaAttachment` myself when I found it silently returning nothing for every persona after the attachment rename, before fixing the path. I did not test any of the other four by inducing a failure, so their behaviour under a real fault is reasoned from the code rather than observed.
