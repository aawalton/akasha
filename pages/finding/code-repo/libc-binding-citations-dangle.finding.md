---
id: 39ab1df6-9ca2-55ee-a8b5-d16e8285de70
page-type-slug: finding
title: "Libc binding citations dangle"
domain-slug: repo/code-repo
---

# Claim

Three live code files cite a "libc FFI Binding" document that no longer exists. `check-libc-ffi-binding.ts:6` names it as the gate's "Authoritative principle", and `supervisor-exec.ts` defers to it at lines 12 and 62 for why the module must be correct on any Linux libc and why binding the mapped object cannot pick the wrong runtime. The document was `dirty/knowledge/libc-ffi-binding.md`, emptied and removed by this ingest. An enforced CI gate now names an authority a reader cannot reach.

# Evidence

The three citations, found by searching the code repo for "libc FFI Binding":

- `packages/infra/checks/src/checks/check-libc-ffi-binding.ts:6` — "Authoritative principle: libc FFI Binding."
- `packages/agents/supervisor/src/supervisor-exec.ts:12` — "so it must be correct on any Linux libc — see libc FFI Binding."
- `packages/agents/supervisor/src/supervisor-exec.ts:62` — "one the process demonstrably runs on. See libc FFI Binding."

Each defers rather than states: the first names the gate's authority without restating it, and the two in `supervisor-exec.ts` end a doc comment by pointing outward for the reasoning behind a design decision.

The target is gone. `dirty/knowledge/libc-ffi-binding.md` was emptied subsection by subsection and removed during this ingest; nothing in the code repo, the instructions repo or the memory repo now carries the name. The remaining mentions in the instructions repo sit under `dirty/questions/`, `dirty/skills/`, `dirty/code/` and `dirty/docs/`, all themselves queued for removal.

The removal was not a loss of reasoning. Both `supervisor-exec.ts` doc comments already restate, in place, what they defer for: lines 52 to 63 give the musl substitution and the second-libc trap in full, and lines 92 to 100 give the sign-only rule and why errno is not read. The gate's own `libc-ffi-binding.ts` carries the same account above `LIBC_BASENAME` and `scanLibcSonameBindings`. What the citations cost is a pointer, not the argument.

WHAT I DID NOT MEASURE. I did not check the code repo's git history for an earlier copy of the document on that side. I did not search for citations written in other wordings — "the libc principle", say — so three is the count for the exact phrase rather than a total. Separately and not part of this claim, `check-libc-ffi-binding.ts:8` says the entry is registered in `check-syntax-bundle.ts`'s `ENTRIES`, whereas it is imported and listed in `scanner-registry.ts`'s `SYNTAX_SCANNER_ENTRIES`; I confirmed the latter and did not pursue the former.
