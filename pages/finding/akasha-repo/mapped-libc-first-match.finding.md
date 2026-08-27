---
id: 89c7b2df-f566-50a5-bf97-f2ebf7401e80
page-type-slug: finding
title: "Mapped libc first match"
domain-slug: repo/akasha-repo
---

# Claim

`resolveMappedLibc()` in `tools/lib/supervisor-exec.ts` returns the first `/proc/self/maps` entry whose basename matches a C-runtime pattern, and nothing establishes that the first match is the libc the process is primarily running on. Maps entries are ordered by address, not by load order. In a process with more than one C runtime mapped, the function can bind the secondary, and an `errno` read through the bound handle would then be wrong.

# Evidence

The function is at `tools/lib/supervisor-exec.ts:21`. It reads `/proc/self/maps`, and for each line takes the substring from the first `/`, strips a trailing ` (deleted)` marker, takes the basename, and does `if (LIBC_MAPPING.test(base)) return path` inside the loop — so the first matching line wins. `LIBC_MAPPING` at `:19` is `/^(libc\.so\.|libc-|libc\.musl-|ld-musl-)/`. Nothing sorts, ranks or cross-checks the candidates, and no second match is ever examined. A run with no match throws.

What it returns is bound once and for everything. `tools/lib/supervisor-exec.ts:32` is `const libc = dlopen(resolveMappedLibc(), {`, and `execvpe`, `fcntl` and the rest of the supervisor's syscalls go through that one handle. A process can map more than one C runtime, each carrying its own thread-local `errno`, and the function offers no way to tell which of them it picked.

WHAT I DID NOT MEASURE. This is an inference from reading the function, not an observed failure. I did not find a process in this estate with two C runtimes mapped. I did not check whether the Linux kernel's ordering of `/proc/self/maps` entries makes the primary libc reliably first in practice; if it does, this is latent rather than live. I replicated the function's logic against this workstation's own `/proc/self/maps`, where the only match is `/usr/lib64/libc.so.6`, so the ambiguity does not arise here.
