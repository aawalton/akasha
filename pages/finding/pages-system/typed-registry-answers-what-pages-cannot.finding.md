---
id: f9d85465-07c2-599f-a589-982159c6ebc6
page-type-slug: finding
title: "Typed registry answers what pages cannot"
domain-slug: domain/pages-system
---

# Claim

Retiring a typed schema for a kind that has moved to a file-backed page type drops that kind out of `tools/lib/owns-roster.ts`, `tools/gates/repo-agrees.ts` and `tools/gates/read-the-schema.ts`, each of which asks the typed registry a question the page-type registry cannot yet be asked. All three go quiet rather than refusing, so the move reads as complete.

# Evidence

Measured on 2026-08-13 while moving `finding` to a file-backed page type, by applying the retirement inside a copy of the repo under `/var/tmp` and reading each instrument before and after.

`owns-roster.ts` line 128 is `const kind = schemaFor(relPath, "memory")?.domain`, then `if (kind !== "finding" && kind !== "initiative") continue`. Live it reports `2071 finding(s) and 19 initiative(s) filed`. With the schema retired it reports `0 finding(s) and 19 initiative(s) filed, of which 0 reach no persona` — exit 0, a well-formed roster, every persona reporting nothing filed against it.

`repo-agrees` and `read-the-schema` both fall to `not-applicable` on every path under `findings/**`. `repo-agrees` is the gate whose own header describes a memory-kind document landing in the instructions repo and reading as a clean write; that hole reopens for the whole kind. `read-the-schema` stops levying that a writer read the shape declaration before authoring, and nothing levies the page type in its place — no gate consults the page-type registry for a reading obligation.

The same retirement was already made for `check-review` earlier the same day, so this is standing rather than hypothetical for at least one kind.

A fourth instrument, `tools/checks/documents-conform.ts`, has the same fault and is being repaired rather than recorded here: it counts only what a typed schema governs, so a retired kind leaves the denominator and the audit reports `pass` and `0 still to migrate` over a smaller corpus.
