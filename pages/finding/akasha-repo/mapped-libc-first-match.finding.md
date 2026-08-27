---
id: 89c7b2df-f566-50a5-bf97-f2ebf7401e80
page-type-slug: finding
title: "Mapped libc first match"
domain-slug: repo/akasha-repo
---

# Claim

`resolveMappedLibc()` in `supervisor-exec.ts` returns the first `/proc/self/maps` entry whose basename matches a C-runtime pattern, and nothing establishes that the first match is the libc the process is primarily running on. Maps entries are ordered by address, not by load order. In a process with two C runtimes mapped, the function could bind the secondary — the state its own doc comment says it makes impossible, and the state in which an `errno` read through the bound handle would be wrong.

# Evidence

The function reads `/proc/self/maps`, and for each line takes the substring from the first `/`, strips a trailing ` (deleted)` marker, takes the basename, and does `if (LIBC_MAPPING.test(base)) return path` inside the loop — so the first matching line wins. `LIBC_MAPPING` is `/^(libc\.so\.|libc-|libc\.musl-|ld-musl-)/`. Nothing sorts, ranks or cross-checks the candidates, and no second match is ever examined. A run with no match throws.

The function's doc comment claims the stronger property: "Binding the mapped object cannot pick the wrong libc, because it binds the one the process demonstrably runs on." That holds when exactly one C runtime is mapped. It is the two-mapped case the claim above is about, and the same comment describes that case as reachable — "a soname can resolve to a libc the process is *not* running (CI step pods put a second glibc first on `LD_LIBRARY_PATH`), which maps a second libc with its own thread-local errno."

The document this came from asserts that in a CI universal step pod the image's own `/usr/lib/x86_64-linux-gnu/libc.so.6` "is not mapped at startup at all", which would leave one match there. That is the condition making first-match correct in that environment, and it is a property of the environment rather than of the function.

WHAT I DID NOT MEASURE. This is an inference from reading the function, not an observed failure. I did not find a process in this estate with two C runtimes mapped, and I did not verify the CI step pod's mapping myself — I have no access to those pods from this seat, so the claim that only one libc is mapped there is the removed document's reading, not mine. I did not check whether the Linux kernel's ordering of `/proc/self/maps` entries makes the primary libc reliably first in practice; if it does, this is latent rather than live. I replicated the function's logic against this workstation's own `/proc/self/maps`, where there is exactly one match, `/usr/lib64/libc.so.6`, so the ambiguity does not arise here.
