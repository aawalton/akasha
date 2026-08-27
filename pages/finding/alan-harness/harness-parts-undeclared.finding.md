---
id: fd8126d5-76ae-55f6-8f90-81452da00cad
page-type-slug: finding
title: "Harness parts undeclared"
domain-slug: domain/alan-harness
---

# Claim

Parts of Alan's harness that no deploy carries are live on commit with nothing declaring where each is kept, and the ordering that was to put a domain over them before anything wrote to them has partly been spent.

# Evidence

Recorded from project #18829, parked at Alan's direction on 2026-08-12 alongside #18794, #18827 and #18828, and never unparked. Nothing about it was blocked or refused; he chose to wait.

Two ends were wanted. Every part of Alan's harness that no deploy carries sits in a repository whose commits are live, or a domain document names what keeps it where it is. And resolving a harness path names a document about that part, rather than only the claim standing over the whole code repository.

Two things it depended on moved underneath it. Its own two criteria restate the `harness-without-a-deploy` initiative rather than adding to it, which is the shape that closed #18790 as a duplicate of that initiative — so whether this is worth reviving as a parent at all, or whether its children should come out as singletons, was open. And #18794 carried the ordering claim that it lands first, so that every write the others make is gated by the domain whose concern that code is: #18792, #18793, #18824 and #18826 were dispatched on 2026-08-12 and wrote to harness code with only the repository-wide claim over them. The ordering can still be honoured for what comes after, and cannot be honoured for those four.

#18828 additionally needed Alan himself: its second criterion leaves the per-level imagery direction to him rather than to a seat reading what the code happens to say, and he had not given it.
